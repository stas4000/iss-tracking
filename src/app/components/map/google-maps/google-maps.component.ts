import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {IssLocationService} from "../../../shared/services/iss-location/iss-location.service";
import { interval } from 'rxjs';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss']
})
export class GoogleMapsComponent {

  issLocationInterval: number = 5000;

  constructor(private httpClient: HttpClient, private issLocationService:IssLocationService) {

    interval(this.issLocationInterval).pipe(mergeMap(() => {
      return this.issLocationService.issLocation()
    })).subscribe((issResponse) => {
      console.log(issResponse);
    })
  }

}
