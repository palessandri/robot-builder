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
      this.Client.authorize(options, (err, authResult) => {
        if (err) {
          reject(err);
        }

        console.log(authResult);

        this.storage.set('access_token', authResult.accessToken);
        const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
        this.storage.set('expires_at', expiresAt);

        resolve(authResult);
      });
    });
  }

  getProfile(accessToken?: string) {
    if (!accessToken) {
      return this.storage.get('profile');
    }

    return new Promise((resolve, reject) => {
      this.Auth0.client.userInfo(accessToken, (err, profile) => {
        if (err) {
          reject(err);
        }

        this.storage.set('profile', profile);
        resolve(profile);
      });
    })
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
