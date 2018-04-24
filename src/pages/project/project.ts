import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProjectProvider } from '../../providers/project/project';
import { WidgetProvider } from '../../providers/widget/widget';


@IonicPage()
@Component({
  selector: 'page-project',
  templateUrl: 'project.html',
})
export class ProjectPage {
  project: any;

  segment = 'widgets';

  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams, 
    private projectProvider: ProjectProvider,
    private widgetProvider: WidgetProvider,
  ) {
    this.project = this.navParams.get('project');
  }

  initData() {
    this.projectProvider.getDocumentById('projects', this.project._id).subscribe(project => {
      this.project = project;
    });
  }

  ionViewWillEnter() {
    this.initData();
  }

  addWidget() {
    this.navCtrl.push('WidgetAddPage', {project: this.project});
  }

  removeWidget(widget: any) {
    const project = Object.assign({}, this.project);
    project.widget_id = widget._id;
    project.delete_widget = true;

    this.projectProvider.updateDocument('projects', project._id, project).subscribe((res) => {
      this.initData();
    }, (error) => {
      console.log(error);
    });
  }

  updateProject() {
    this.projectProvider.updateDocument('projects', this.project._id, this.project).subscribe((res) => {
      this.initData();
    }, (error) => {
      console.log(error);
    });
  }

  deleteProject() {
    this.projectProvider.deleteProject(this.project._id).subscribe(res => {
      this.navCtrl.setRoot('HomePage');
    }, (error) => {
      console.log(error);
    });
  }

}
