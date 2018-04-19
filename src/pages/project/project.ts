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
  widgets: any;

  segment = 'widgets';

  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams, 
    private projectProvider: ProjectProvider,
    private widgetProvider: WidgetProvider,
  ) {
    this.project = this.navParams.get('project');
  }

  ionViewWillEnter() {
    this.initData();
  }

  private initData() {
    this.widgetProvider.getWidgetsByProjectId(this.project._id).subscribe(widgets => {
      this.widgets = widgets;
    });
  }

  addWidget() {
    this.navCtrl.push('WidgetAddPage', {projectId: this.project._id});
  }

  removeWidget(widget: any) {
    widget.projectId = null;
    this.widgetProvider.updateDocument('widgets', widget._id, widget).subscribe((res) => {
      this.initData();
    });
  }

  updateProject() {
    this.projectProvider.updateDocument('projects', this.project._id, this.project).subscribe((res) => {
      console.log(res);
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
