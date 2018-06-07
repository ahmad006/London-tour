import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RoutePage } from '../route/route';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  openRoute(){
    this.navCtrl.setRoot(RoutePage);
  }

}
