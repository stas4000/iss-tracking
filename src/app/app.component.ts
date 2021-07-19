import {Component, OnDestroy} from '@angular/core';
import { TabItem } from './shared/interfaces/tab-item';
import { currentTime } from './shared/classes/utilities.class';
import { Store } from "@ngrx/store";
import { TimeLocation } from "./shared/interfaces/time-location";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy{
  currentTime = currentTime();
  title = 'ISS Tracking';
  tabs: TabItem[] = [
    {
      label: 'Map',
      icon: 'home',
      route: 'map',
    },
    {
      label: 'Report',
      icon: 'person',
      route: 'report',
    }
  ];
  currentTimeAndLocation$: Subscription;
  time: string = "";
  lat: string = "";
  lng: string = "";

  constructor(private store: Store<{ currentTimeAndLocation: TimeLocation }>) {
    this.currentTimeAndLocation$ = store.select('currentTimeAndLocation').subscribe((currentTimeAndLocation: TimeLocation) => {
      this.time = currentTimeAndLocation.time;
      this.lat = currentTimeAndLocation.lat;
      this.lng = currentTimeAndLocation.lng;
    });
  }

  ngOnDestroy() {
    this.currentTimeAndLocation$.unsubscribe();
  }
}
