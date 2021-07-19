import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, filter, map} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {IssApiResponse} from "../../interfaces/iss-api-response";

@Injectable({
  providedIn: 'root'
})
export class IssLocationService {

  constructor(private http: HttpClient) { }

  private issApiUrl = "http://api.open-notify.org/iss-now.json?callback=CALLBACK";

  /**
   * todo: add interface
   */
  issLocation() : Observable<IssApiResponse> {
    return this.http.jsonp<IssApiResponse>(this.issApiUrl, 'callback')
  }

  getCountryName(lat:string, lng:string) {
    return this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyBIMqAdyLpqMS-w3oCJcVUfs2FIsMUEFBU`)
      .pipe(map((response:any) => {
        if(response.results) {
          console.log(response);
          let selectedResult = response.results.filter((results: any) => {
              return results.types.includes("country");
          });
          if(selectedResult.length > 0) {
            return selectedResult[0].formatted_address;
          } else {
            let selectedResult = response.results.filter((results: any) => {
              return results.types.includes("establishment");
            });
            if(selectedResult.length > 0) {
              return selectedResult[0].formatted_address;
            }
          }
        }
      }), map((mapResult: string) => {
          return !mapResult ? "Unregistered" : mapResult;
      }))
  }
}
