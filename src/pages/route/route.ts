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
   // For Route 390
  //apiUrl = 'https://api.tfl.gov.uk/Line/390/Route/Sequence/outbound?serviceTypes=Regular&excludeCrowding=false';
  // For Route 222
  apiUrl = 'https://api.tfl.gov.uk/Line/222/Route/Sequence/outbound?serviceTypes=Regular&excludeCrowding=false';
  items = [
    'London bus route 390',
  ];
  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public http: Http, private geolocation: Geolocation, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // this.loadMap();
    this.itemSelected();
  }

  itemSelected(){
  Deg2Rad(deg: float) {
    return deg * Math.PI / 180;
  }
  pythagorasEquirectangular(lat1: float, lon1: float, lat2: float, lon2: float) {
    const R = 6371; // Radius of the earth in km
    const dLat = this.Deg2Rad(lat2-lat1);  // deg2rad below
    const dLon = this.Deg2Rad(lon2-lon1);
    const a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.Deg2Rad(lat1)) * Math.cos(this.Deg2Rad(lat2)) *
      Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const  d = R * c; // Distance in km
    const minDist = 0.1
    return d < minDist;
  }

  itemSelected(item: string) {
    let watch = this.geolocation.watchPosition();
    watch.subscribe((geoData) => {
      console.log(geoData);
      this.http.get(this.apiUrl).subscribe((data) => {
        const stoppoints = JSON.parse(data["_body"]).stopPointSequences[0].stopPoint;
        for(var i = 0; i < stoppoints.length; i++){
          //if(this.pythagorasEquirectangular(51.565490, -0.134817, stoppoints[i].lat, stoppoints[i].lon)) {
          if(this.pythagorasEquirectangular(geoData.coords.latitude, geoData.coords.longitude, stoppoints[i].lat, stoppoints[i])) {
            this.routeName = stoppoints[i].name;
            console.log(this.routeName);
            console.log(stoppoints[i]);
          }
          else
          {
            this.routeName = "sorry no place found"
          }
        }
      })
    }); 
  }
}
