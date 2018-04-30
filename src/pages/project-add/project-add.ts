import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ProjectProvider } from '../../providers/project/project';

/**
 * Generated class for the ProjectAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-project-add',
  templateUrl: 'project-add.html',
})
export class ProjectAddPage {
  project: any = {};
  userId: string;

  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams, 
    private loadingCtrl: LoadingController,
    private projectProvider: ProjectProvider,
  ) {
    this.userId = this.navParams.get('userId');
  }

  onCreate() {
    const loading = this.loadingCtrl.create();
    loading.present();

    this.project.userId = this.userId;
    console.log(this.project);
    this.projectProvider.addDocument('projects', this.project).subscribe((res) => {
      loading.dismiss();
    });
  }

}
