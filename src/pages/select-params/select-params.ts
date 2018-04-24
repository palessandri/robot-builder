import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-select-params',
  templateUrl: 'select-params.html',
})
export class SelectParamsPage {
  widget: any;
  listArr = [];
  listValues = Array(10).fill(1).map((x, i) => i+1);

  constructor(public viewCtrl: ViewController, public navParams: NavParams) {
    this.widget = this.navParams.get('widget');
    this.listArr = Array(this.widget.paramCount || 0).fill(1);
  }

  save() {
    this.viewCtrl.dismiss(this.widget);
  }

}
