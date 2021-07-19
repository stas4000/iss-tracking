import { Component, OnDestroy } from '@angular/core';
import { first, mergeMap } from 'rxjs/operators';
import { IssLocationService } from "../../../shared/services/iss-location/iss-location.service";
import { interval, Observable, Subscription } from 'rxjs';
import { IssApiResponse } from "../../../shared/interfaces/iss-api-response";
import { SavedLocation } from "../../../shared/interfaces/saved-location";
import { Store } from "@ngrx/store";
import { addCurrentTimeAndLocation, addLocation } from "../../../shared/state/saved-locations.actions";
import { v4 as uuidv4 } from 'uuid';
import { currentTime } from "../../../shared/classes/utilities.class";

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss'],
})
export class GoogleMapsComponent implements OnDestroy {
  savedLocations$: Observable<SavedLocation[]>

  issLocationInterval: number = 5000;
  center: google.maps.LatLngLiteral = {lat: 24, lng: 12};
  zoom = 4;
  markerOptions: google.maps.MarkerOptions = {draggable: false, icon: "assets/iss-icon.png"};
  markerPosition: google.maps.LatLngLiteral = this.center;
  issLocation$: Subscription = new Subscription();
  countryName$: Subscription = new Subscription();
  zoomLocation$:Subscription;
  showCurrentLocation$:Subscription;

  constructor(private issLocationService:IssLocationService, private store:
    Store<{ savedLocations: SavedLocation[], zoomLocation: google.maps.LatLngLiteral, showCurrentLocation: boolean }>) {
    this.savedLocations$ = store.select('savedLocations');
    this.zoomLocation$ = store.select('zoomLocation').subscribe((zoomLocation: google.maps.LatLngLiteral) => {
      if(zoomLocation) {
        this.issLocation$.unsubscribe();
        this.center = {lat: zoomLocation.lat, lng: zoomLocation.lng};
        this.markerPosition = {lat: zoomLocation.lat, lng: zoomLocation.lng};
      }
    });
    this.showCurrentLocation$ = store.select('showCurrentLocation').subscribe((showCurrentLocation: boolean) => {
      if(showCurrentLocation) {
        this.oneTimeIssCall();
        this.intervalIssCall();
      }
    });
  }

  saveLocation(lat:number, lng:number) {
    this.countryName$ = this.issLocationService.getCountryName(lat.toString(), lng.toString()).subscribe((country) => {
      this.store.dispatch(addLocation({id: uuidv4(), time:currentTime(), country:country, lat:lat.toString(), lng:lng.toString()}));
    })
  }

  oneTimeIssCall() {
    this.issLocationService.issLocation().pipe(first()).subscribe((issResponse: IssApiResponse) => {
      this.locationAdjustments(issResponse);
    });
  }

  intervalIssCall() {
    this.issLocation$ = interval(this.issLocationInterval).pipe(mergeMap(() => {
      return this.issLocationService.issLocation()
    })).subscribe((issResponse: IssApiResponse) => {
      this.locationAdjustments(issResponse);
    })
  }

  locationAdjustments(issResponse: IssApiResponse) {
    this.center = {lat: parseFloat(issResponse.iss_position.latitude), lng: parseFloat(issResponse.iss_position.longitude)};
    this.markerPosition = {lat: parseFloat(issResponse.iss_position.latitude), lng: parseFloat(issResponse.iss_position.longitude)};
    this.store.dispatch(addCurrentTimeAndLocation({time: currentTime(), lat:issResponse.iss_position.latitude.toString(), lng:issResponse.iss_position.longitude.toString()}));
  }

  ngOnDestroy() {
    this.issLocation$.unsubscribe();
    this.countryName$.unsubscribe();
    this.showCurrentLocation$.unsubscribe();
    this.zoomLocation$.unsubscribe();
  }
}
