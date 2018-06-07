import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RoutePage } from './route';
import {Geolocation} from '@ionic-native/geolocation'

@NgModule({
  declarations: [
    RoutePage,
  ],
  imports: [
    IonicPageModule.forChild(RoutePage),
  ],
})
export class RoutePageModule {}
