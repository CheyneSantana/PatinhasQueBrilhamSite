import { PatinhasService } from './patinhas.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LojaService {
  private baseUrl = this.patinhas.getBaseUrl() + '/Loja/';

  constructor(private http: HttpClient, private patinhas: PatinhasService) { }

  getProdutos() {
    return this.http.get(this.baseUrl + 'GetProdutos').pipe(map(data => data));
  }
}
