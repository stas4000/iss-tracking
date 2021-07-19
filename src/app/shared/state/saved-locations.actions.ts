import { createAction, props } from '@ngrx/store';

export const addLocation = createAction(
  '[Saved Locations] Add Location',
  props<{id:string, time:string, country:string, lat:string, lng:string }>()
);

export const deleteLocation = createAction(
  '[Saved Locations] Delete Location',
  props<{id:string, time:string, country:string, lat:string, lng:string }>()
);

export const updateCurrentLocation = createAction(
  '[Saved Locations] Update Current Location',
  props<{ lat:string, lng:string }>()
);

export const showCurrentLocation = createAction(
  '[Saved Locations] Show Current Location',
  props<{ showCurrentLocation:boolean }>()
);

export const addCurrentTimeAndLocation = createAction(
  '[Saved Locations] Add Current Time And Location',
  props<{ time: string, lat:string, lng:string }>()
);
