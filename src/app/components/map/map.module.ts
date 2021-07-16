import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from "./map.component";
import { GoogleMapsModule } from "@angular/google-maps";
import { GoogleMapsComponent } from './google-maps/google-maps.component';
import { BrowserModule } from "@angular/platform-browser";
import { IssLocationService } from "../../shared/services/iss-location/iss-location.service";



@NgModule({
  declarations: [MapComponent, GoogleMapsComponent],
  providers: [IssLocationService],
  imports: [
    GoogleMapsModule,
    CommonModule,
    BrowserModule,
  ],
  exports: [
    GoogleMapsComponent,
    MapComponent
  ]
})
export class MapModule { }
