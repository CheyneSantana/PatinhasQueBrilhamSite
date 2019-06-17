import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private baseUrl = window.location.origin + "/api/Home/";

  constructor(private http: HttpClient) { }

  getCapas() {
    return this.http.get(this.baseUrl + "GetCapas").pipe(map(data => data));
  }
}
