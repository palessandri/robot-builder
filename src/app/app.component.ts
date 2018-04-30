import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth/auth';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'HomePage';
  currentUser: any;

  pages: Array<{title: string, component: any, icon: string}>;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public events: Events,
    private authProvider: AuthProvider
  ) {
    this.initializeApp();

    this.pages = [
      { title: 'Projects',  component: 'HomePage', icon: 'list-box' },
      { title: 'Devices',   component: 'HomePage', icon: 'phone-portrait' },
      { title: 'Community', component: 'HomePage', icon: 'chatbubbles' }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.authProvider.initAuth();

      this.authProvider.login().then((user) => {
        this.currentUser = user;
        console.log('logged in...', user);
      }, (error) => {
        console.log(error);
      });
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout() {
    this.authProvider.logout();
  }
}
