import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {SavedLocation} from "../../../shared/interfaces/saved-location";
import {combineLatest, Observable, Subscription} from "rxjs";
import {
  deleteLocation,
  showCurrentLocation,
  updateCurrentLocation
} from "../../../shared/state/saved-locations.actions";
import {FormControl} from "@angular/forms";
import {
  distinctUntilChanged,
  map,
  startWith,
  throttleTime,
  filter,
  debounceTime,
  switchMap,
  tap,
  shareReplay
} from "rxjs/operators";
import {fromFetch} from "rxjs/fetch";

@Component({
  selector: 'app-saved-locations-list',
  templateUrl: './saved-locations-list.component.html',
  styleUrls: ['./saved-locations-list.component.scss']
})
export class SavedLocationsListComponent implements OnInit, OnDestroy {
  savedLocations$: Observable<SavedLocation[]>
  filter: FormControl;
  filter$: Observable<any>;
  filteredStates$: Observable<SavedLocation[]>;
  savedLocationsSubscription$: Subscription = new Subscription();
  selected: string|null = null;
  private cache: Observable<SavedLocation[]>[] = [];

  constructor(private store: Store<{ savedLocations: SavedLocation[], selectedLocation: string|null }>) {
    this.savedLocations$ = store.select('savedLocations');
    this.filter = new FormControl('');
    this.filter$ = this.filter.valueChanges.pipe(
      startWith(''),
      distinctUntilChanged(),
      debounceTime(500),
    );
    this.selected = localStorage.getItem("selectedLocation");
    this.filteredStates$ = combineLatest(this.savedLocations$, this.filter$).pipe(
      map(([states, filterString]) => states.filter(state => state.country.toLowerCase().indexOf(filterString.toLowerCase()) !== -1))
    );
  }

  ngOnInit(): void {
  }

  zoomOnLocation(savedLocation: SavedLocation) {
    this.store.dispatch(updateCurrentLocation({lat:savedLocation.lat, lng:savedLocation.lng}));
  }

  selectedLocation(id: string) {
    if(this.selected == id) {
      this.selected = null;
      localStorage.setItem("selectedLocation", "");
      this.store.dispatch(showCurrentLocation({showCurrentLocation: true}));
    } else {
      this.selected = id;
      localStorage.setItem("selectedLocation", id);
      this.store.dispatch(showCurrentLocation({showCurrentLocation: false}));
    }
  }

  deleteLocation(savedLocation: SavedLocation, event: any) {
    event.stopPropagation();
    this.store.dispatch(deleteLocation({id: savedLocation.id, time:savedLocation.time ,country:"", lat: savedLocation.lat, lng: savedLocation.lng}));
    if(savedLocation.id == this.selected) {
      localStorage.setItem("selectedLocation", "");
      this.store.dispatch(showCurrentLocation({showCurrentLocation: true}));
    }
  }

  ngOnDestroy() {
  }
}
