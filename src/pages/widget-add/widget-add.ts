import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WidgetProvider } from '../../providers/widget/widget';


@IonicPage()
@Component({
  selector: 'page-widget-add',
  templateUrl: 'widget-add.html',
})
export class WidgetAddPage {
  widgets: any;
  projectId: string;

  constructor(private navCtrl: NavController, private navParams: NavParams, private widgetProvider: WidgetProvider) {
    this.projectId = this.navParams.get('projectId');

    this.widgetProvider.widgtes.subscribe((widgets: any[]) => {
      console.log(widgets);
      this.widgets = widgets.filter(widget => widget.projectId !== this.projectId);
    });
  }

  selectWidget(widget: any) {
    widget.projectId = this.projectId;
    this.widgetProvider.updateDocument('widgets', widget._id, widget).subscribe((res) => {
      console.log(res);
      this.navCtrl.pop();
    }, (error) => {
      console.log(error);
    });
  }

}
