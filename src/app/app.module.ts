import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from "@angular/common";
import { MapModule } from "./components/map/map.module";
import { HttpClientJsonpModule, HttpClientModule } from "@angular/common/http";
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavModule } from "./components/sidenav/sidenav.module";
import { StoreModule } from '@ngrx/store';
import {
  currentTimeAndLocationReducer,
  savedLocationsReducer,
  showCurrentLocationsReducer,
  updateLocationsReducer
} from './shared/state/saved-locations.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {metaReducers} from "./shared/state/persist-state-reducer";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    MapModule,
    HttpClientModule,
    HttpClientJsonpModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    SidenavModule,
    StoreModule.forRoot(
      { savedLocations: savedLocationsReducer, zoomLocation:updateLocationsReducer,
        showCurrentLocation:showCurrentLocationsReducer, currentTimeAndLocation: currentTimeAndLocationReducer }, {metaReducers}),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
