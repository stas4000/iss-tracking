import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from "./map.component";
import { GoogleMapsModule } from "@angular/google-maps";
import { GoogleMapsComponent } from './google-maps/google-maps.component';
import { IssLocationService } from "../../shared/services/iss-location/iss-location.service";
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from "@angular/router";



@NgModule({
  declarations: [MapComponent, GoogleMapsComponent],
  providers: [IssLocationService],
  imports: [
    GoogleMapsModule,
    CommonModule,
    MatButtonModule,
    RouterModule.forChild([{ path: '', component: MapComponent }])
  ],
  exports: [
    GoogleMapsComponent,
    MapComponent
  ]
})
export class MapModule { }
