import { Component,ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RoutePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-route',
  templateUrl: 'route.html',
})
export class RoutePage {
	 items = [
    'London bus route 390',
  ];
  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
   ionViewDidLoad() {
    this.loadMap();
  }


  itemSelected(item: string) {
  
  }
    loadMap(){


      // let latLng = new google.maps.LatLng(51.5655, 0.1349);

      // let mapOptions = {
      //   center: latLng,
      //   zoom: 10,
      //   mapTypeId: google.maps.MapTypeId.ROADMAP
      // }

      // let self = this;
      // this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  
  }

}
