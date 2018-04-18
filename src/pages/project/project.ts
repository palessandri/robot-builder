import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProjectProvider } from '../../providers/project/project';


@IonicPage()
@Component({
  selector: 'page-project',
  templateUrl: 'project.html',
})
export class ProjectPage {
  project: any;
  segment = 'widgets';

  constructor(private navCtrl: NavController, private navParams: NavParams, private projectProvider: ProjectProvider) {
    this.project = this.navParams.get('project');
  }

  addWidget() {
    this.navCtrl.push('WidgetAddPage', {projectId: this.project._id});
  }

  deleteProject() {
    console.log(this.project);
    this.projectProvider.deleteProject(this.project._id).subscribe(res => {
      this.navCtrl.setRoot('HomePage');
    }, (error) => {
      console.log(error);
    });
  }

}
