import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WidgetAddPage } from './widget-add';

@NgModule({
  declarations: [
    WidgetAddPage,
  ],
  imports: [
    IonicPageModule.forChild(WidgetAddPage),
  ],
})
export class WidgetAddPageModule {}
