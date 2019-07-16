import { PatinhasService } from './patinhas.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FooterService {
  private baseUrl = this.patinhas.getBaseUrl() + '/Footer/';

  constructor(private http: HttpClient, private patinhas: PatinhasService) { }

  getApoios() {
    return this.http.get(this.baseUrl + 'getApoios').pipe(map(data => data));
  }
}
