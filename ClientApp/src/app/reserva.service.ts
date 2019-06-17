import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Reserva } from 'src/Models/Reserva';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private baseUrl = window.location.origin + "/api/Reserva/";

  constructor(private http: HttpClient) { }

  enviarReserva(reserva: Reserva) {
    return this.http.post(this.baseUrl + "Reservar", reserva);
  }

  pesquisarTicket(ticket: number, userId: number) {
    const params = new HttpParams()
      .set("ticket", ticket.toString())
      .set("userId", userId.toString());

    return this.http.get(this.baseUrl + "PesquisarReserva", { params }).pipe(map(data => data));
  }

  atualizarReserva(reserva: Reserva) {
    return this.http.post(this.baseUrl + "AtualizarReserva", reserva);
  }

  cancelarReserva(reserva: Reserva) {
    return this.http.post(this.baseUrl + "CancelarReserva", reserva);
  }

  enviarEmailAtualizacao(reserva: Reserva) {
    return this.http.post(this.baseUrl + "EnviarEmailAtualizacaoReserva", reserva);
  }
}
