import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map} from "rxjs/operators";
import {of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class IssLocationService {

  constructor(private http: HttpClient) { }

  private issApiUrl = "http://api.open-notify.org/iss-now.json?callback=CALLBACK";

  /**
   * todo: add interface
   */
  issLocation() {
    return this.http.jsonp(this.issApiUrl, 'callback')
  }
}
