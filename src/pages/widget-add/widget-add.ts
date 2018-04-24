import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { WidgetProvider } from '../../providers/widget/widget';
import { ProjectProvider } from '../../providers/project/project';


@IonicPage()
@Component({
  selector: 'page-widget-add',
  templateUrl: 'widget-add.html',
})
export class WidgetAddPage {
  widgets: any;
  project: any;

  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams, 
    private modalCtrl: ModalController, 
    private widgetProvider: WidgetProvider,
    private projectProvider: ProjectProvider
  ) {
    this.project = this.navParams.get('project');

    this.widgetProvider.widgets.subscribe((widgets: any[]) => {
      this.widgets = widgets.filter(widget => {
        for (let i=0; i<this.project.widgets.length; i++) {
          if (this.project.widgets[i]._id === widget._id)
            return false;
        }
        return true;
      });
    });
  }

  selectWidget(widget: any) {
    const modalCtrl = this.modalCtrl.create('SelectParamsPage', {widget: widget});
    modalCtrl.onDidDismiss(widget => {
      this.widgetProvider.updateDocument('widgets', widget._id, widget).subscribe(() => {
        const project = Object.assign({}, this.project);
        project.widget_id = widget._id;
        this.projectProvider.updateDocument('projects', project._id, project).subscribe(() => {
          this.navCtrl.pop();
        });
      });
    });
    modalCtrl.present();
  }

}
