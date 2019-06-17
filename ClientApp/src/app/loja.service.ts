import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LojaService {
  private baseUrl = window.location.origin + "/api/Loja/";

  constructor(private http: HttpClient) { }

  getProdutos() {
    return this.http.get(this.baseUrl + "GetProdutos").pipe(map(data => data));
  }
}
