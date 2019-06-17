import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FooterService {
  private baseUrl = window.location.origin + "/api/Footer/";

  constructor(private http: HttpClient) { }

  getApoios() {
    return this.http.get(this.baseUrl + "getApoios").pipe(map(data => data));
  }
}
