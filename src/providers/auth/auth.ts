import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import Auth0Cordova from '@auth0/cordova';
import * as auth0 from 'auth0-js';


export const AUTH_CONFIG = {
  clientID: 'oKl3Yh3YuYUOtfTuFGa2EsZzxJcJvdn1',
  clientId: 'oKl3Yh3YuYUOtfTuFGa2EsZzxJcJvdn1',
  domain: 'robot-builder.auth0.com',
  packageIdentifier: 'com.kenyx.robotbuilder'
};

@Injectable()
export class AuthProvider {

  constructor(private storage: Storage) {
  }

  get Auth0() {
    return new auth0.WebAuth(AUTH_CONFIG);
  }

  get Client() {
    return new Auth0Cordova(AUTH_CONFIG);
  }

  initAuth() {
    (window as any).handleOpenURL = (url: string) => {
      Auth0Cordova.onRedirectUri(url);
    }
  }

  login() {
    const options = {
      scope: 'openid profile offline_access'
    };

    return new Promise((resolve, reject) => {
      this.Client.authorize(options, async (err, authResult) => {
        if (err) {
          reject(err);
        }

        this.storage.set('access_token', authResult.accessToken);
        const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
        this.storage.set('expires_at', expiresAt);

        let profile = await this.getProfile(authResult.accessToken) 
        resolve(profile);
      });
    });
  }
  
  private getProfile(accessToken: string) {
    return new Promise((resolve, reject) => {
      this.Auth0.client.userInfo(accessToken, async (err, profile) => {
        if (err) {
          reject(err);
        }

        await this.storage.set('profile', profile);
        resolve(profile);
      });
    });
  }

  get currentUser() {
    return this.storage.get('profile');
  }


  get isLoggedIn() {
    return this.storage.get('expires_at').then(expires => {
      return Promise.resolve(Date.now() < JSON.parse(expires));
    });
  }

  logout() {
    this.storage.remove('profile');
    this.storage.remove('access_token');
    this.storage.remove('expires_at');
  }

}
