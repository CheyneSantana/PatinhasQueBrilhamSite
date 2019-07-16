import { PatinhasService } from './patinhas.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private baseUrl = this.patinhas.getBaseUrl() + '/Home/';

  constructor(private http: HttpClient, private patinhas: PatinhasService) { }

  getCapas() {
    return this.http.get(this.baseUrl + 'GetCapas').pipe(map(data => data));
  }
}
