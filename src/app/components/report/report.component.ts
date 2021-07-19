import {Component, OnDestroy, OnInit} from '@angular/core';
import { Store } from "@ngrx/store";
import { SavedLocation } from "../../shared/interfaces/saved-location";
import { Observable, Subscription } from "rxjs";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit, OnDestroy {
  columns = [
    { name: 'Country', prop: 'country'},
    { name: 'Latitude', prop: 'lat'},
    { name: 'Longitude', prop: 'lng' },
    { name: 'Time', prop: 'time' }
  ];
  savedLocations$: Observable<SavedLocation[]>
  savedLocationsSubscription$: Subscription;
  rows:SavedLocation[] = [];
  constructor(private store: Store<{ savedLocations: SavedLocation[] }>) {
    this.savedLocations$ = store.select('savedLocations');
    this.savedLocationsSubscription$ = this.savedLocations$.subscribe((savedLocations: SavedLocation[]) => {
      this.rows = [...savedLocations];
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.savedLocationsSubscription$.unsubscribe();
  }

}
