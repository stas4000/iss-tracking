import { createReducer, on, Action } from '@ngrx/store';

import { addLocation, showCurrentLocation, updateCurrentLocation, deleteLocation, addCurrentTimeAndLocation } from './saved-locations.actions';
import { SavedLocation } from '../interfaces/saved-location';
import { TimeLocation } from "../interfaces/time-location";

export const initialState: SavedLocation[] = [];
export const initialStateUpdate: google.maps.LatLngLiteral = {lat: 0, lng:0};
export const initialCurrentLocationState: boolean = true;
export const initialSelectedLocationState: string|null = null;
export const initialCurrentTimeAndLocationState: TimeLocation = {time:"", lat: "0", lng:"0"};

export const savedLocationsReducer = createReducer(
  initialState,
  on(deleteLocation, (state, { id, time, country, lat, lng }) => state.filter((location) => {
    return location.id !== id;
  })),
  on(addLocation, (state, {id, time, country, lat, lng }) => [...state, {id, time, country, lat, lng}]),
);

export const updateLocationsReducer = createReducer(
  initialStateUpdate,
  on(updateCurrentLocation, (state, { lat, lng }) => {return {lat: parseFloat(lat), lng:parseFloat(lng)}})
);

export const showCurrentLocationsReducer = createReducer(
  initialCurrentLocationState,
  on(showCurrentLocation, (state, { showCurrentLocation }) => showCurrentLocation)
);

export const currentTimeAndLocationReducer = createReducer(
  initialCurrentTimeAndLocationState,
  on(addCurrentTimeAndLocation, (state, { time, lat, lng }) => {return {time:time, lat:lat, lng:lng}})
);

