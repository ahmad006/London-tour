import { Component,ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Http } from '@angular/http';


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
  routeName = "";
  apiUrl = 'https://api.tfl.gov.uk/Line/390/Route/Sequence/inbound?serviceTypes=Regular&excludeCrowding=true';
  items = [
    'London bus route 390',
  ];
  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public http: Http, private geolocation: Geolocation, public navCtrl: NavController, public navParams: NavParams) {
  }
  ionViewDidLoad() {
    this.loadMap();
  }


  itemSelected(item: string) {
    let watch = this.geolocation.watchPosition();
    watch.subscribe((geoData) => {
      console.log(geoData);
      this.http.get(this.apiUrl).subscribe((data) => {
        const stations = JSON.parse(data["_body"]).stations;
        console.log(stations);
        for (var i = 0; i < stations.length; i++) {
          if(stations[i].lat == geoData.coords.latitude && stations[i].lon == geoData.coords.longitude) {
          //if(stations[i].lat == 51.556822 && stations[i].lon == -0.138433) {
            this.routeName = stations[i].name;
            console.log('this is here' + this.routeName);
          }
        }
      })
    });
  }
  loadMap(){

  }

}
