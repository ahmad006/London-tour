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
  lat: any;
  lon: any;
  distance: any;
  routeName = "";
  routeList = [];
   // For Route 390
  // apiUrl = 'https://api.tfl.gov.uk/Line/390/Route/Sequence/outbound?serviceTypes=Regular&excludeCrowding=false';
  // For Route 222
  apiUrl = 'https://api.tfl.gov.uk/Line/222/Route/Sequence/outbound?serviceTypes=Regular&excludeCrowding=false';
 
  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public http: Http, private geolocation: Geolocation, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // this.loadMap();
  }


  Deg2Rad(deg: any) {
    return deg * Math.PI / 180;
  }
  pythagorasEquirectangular(lat1: any, lon1: any, lat2: any, lon2: any) {

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
    return d;
  }

  itemSelected() {
    let watch = this.geolocation.watchPosition();
    watch.subscribe((geoData) => {
      this.lat = geoData.coords.latitude;
      this.lon = geoData.coords.longitude;
      this.http.get(this.apiUrl).subscribe((data) => {
        const stoppoints = JSON.parse(data["_body"]).stopPointSequences[0].stopPoint;

        for(var i = 0; i < stoppoints.length; i++){
          // Static stop testing for 390
          //const calculatedDistance = this.pythagorasEquirectangular(51.565394, -0.134540, stoppoints[i].lat, stoppoints[i].lon)
          // Dynamic stops
          const calculatedDistance = this.pythagorasEquirectangular(geoData.coords.latitude, geoData.coords.longitude, stoppoints[i].lat, stoppoints[i].lon);
          if( calculatedDistance < 1 ) {
            // store all stops that are in less then 1 km
            this.routeList.push({stopPoint: stoppoints[i], distance: calculatedDistance});
          }
        }
        // check if there is any stop less then 1 km
        if (this.routeList.length) {
          // find the nearest Stop
          // sort the stops that are nearest
          const nearestStop = this.routeList.sort((a: any, b: any) => {
            if (a.distance < b.distance) {
              return -1;
            } else if (a.distance > b.distance) {
              return 1
            } else {
              return 0;
            }
          })
          const { stopPoint, distance } = nearestStop[0];
          this.routeName = stopPoint.name;
          this.distance = distance.toFixed(2);
        } else {
          this.routeName = 'No stop found';
        }
      })
    });
  }
}
