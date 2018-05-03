import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProjectProvider } from '../../providers/project/project';
import { AuthProvider } from '../../providers/auth/auth';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  projects: any;
  currentUser: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private projectProvider: ProjectProvider,
    private authProvider: AuthProvider
  ) {
  }

  ionViewWillEnter() {
    this.initData();
  }

  private initData() {
    this.authProvider.currentUser.then(user => {
      this.currentUser = user;

      if (user && user.sub) {
        this.projectProvider.getProjectsByUser(user.name)
          .subscribe(projects => {
            this.projects = projects;
          });
      }
    }, (error) => {
      console.log(error);
    });
  }

  addProject() {
    this.navCtrl.push('ProjectAddPage', {userId: this.currentUser.name});
  }

  goToProject(project: any) {
    this.navCtrl.push('ProjectPage', {project: project});
  }

}
