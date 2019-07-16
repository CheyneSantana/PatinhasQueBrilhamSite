import { PatinhasService } from './patinhas.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { FormularioDTO } from 'src/Models/FormularioDTO';

@Injectable({
  providedIn: 'root'
})
export class AdocaoService {
  private baseUrl = this.patinhas.getBaseUrl() + '/Adocao/';

  constructor(private http: HttpClient, private patinhas: PatinhasService) { }

  getAnimais() {
    return this.http.get(this.baseUrl + 'getAnimaisAdocao').pipe(map(data => data));
  }

  enviarSolicitacao(formulario: FormularioDTO) {
    return this.http.post(this.baseUrl + 'EnviarSolicitacao/', formulario);
  }

  buscarCep(cep: string) {
    const params = new HttpParams()
      .set('ZipCode', cep);

    return this.http.get(this.baseUrl + 'BuscarCep', { params }).pipe(map(data => data));
  }

  getIntermediador() {
    return this.http.get(this.baseUrl + 'getIntermediador');
  }
}
