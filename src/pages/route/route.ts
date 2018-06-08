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
  apiUrl = 'https://api.tfl.gov.uk/Line/390/Route/Sequence/outbound?serviceTypes=Regular&excludeCrowding=false';
  items = [
    'London bus route 390',
  ];
  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public http: Http, private geolocation: Geolocation, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // this.loadMap();
  }

  itemSelected(item: string) {
    let watch = this.geolocation.watchPosition();
    watch.subscribe((geoData) => {
      console.log(geoData);
      this.http.get(this.apiUrl).subscribe((data) => {
        const stoppoints = JSON.parse(data["_body"]).stopPointSequences[0].stopPoint;
        console.log(stoppoints);
        for(var i = 0; i < stoppoints.length; i++){
          // if(stoppoints[i].lat == geoData.coords.latitude && stoppoints[i].lon == geoData.coords.longitude) {
          if(stoppoints[i].lat == 51.564831 && stoppoints[i].lon == -0.134817){
            this.routeName = stoppoints[i].name;
            console.log('this is here' + this.routeName);
          }
        }
      })
    });
  }
}
