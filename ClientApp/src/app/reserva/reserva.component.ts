import { Component, OnInit } from '@angular/core';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { ReservaService } from '../reserva.service';
import { Reserva, KdEstado } from 'src/Models/Reserva';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { MatDatepickerInputEvent } from '@angular/material';
import { error } from 'protractor';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';
import { PatinhasService } from '../patinhas.service';

export interface TipoPet {
  tipo: string;
}

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.scss']
})
export class ReservaComponent implements OnInit {
  public hoveredDate: NgbDate;
  public fromDate: Date;
  public toDate: Date;
  public minDate = new Date();
  public nomeDono: string;
  public nomePet: string;
  public residencial: string;
  public celular: string;
  public email: string;
  public comentario: string;
  public reserva: Reserva;
  public hasErro: boolean;
  public tipoPet: string;
  public raca: string;
  public ticket: number;
  public isEdit: boolean = false;
  public reservaId: number = 0;
  public estado: string;
  public idadePet: number;
  public portePet: string;

  constructor(private calendar: NgbCalendar,
    private service: ReservaService,
    public toastr: ToastrManager,
    private router: Router,
    private patinhas: PatinhasService) {
  }

  ngOnInit() {
    if (!this.patinhas.currentUserValue())
      this.router.navigate(['/']);
  }

  public selectedFrom(event: MatDatepickerInputEvent<Date>) {
    this.fromDate = new Date(event.value.getFullYear(), event.value.getMonth(), event.value.getDate());
  }

  public selectedTo(event: MatDatepickerInputEvent<Date>) {
    this.toDate = new Date(event.value.getFullYear(), event.value.getMonth(), event.value.getDate());
  }

  private reservar() {
    this.patinhas.executeBar = true;
    if (!this.validarDados()) {
      this.montarReserva();
      this.service.enviarReserva(this.reserva)
        .subscribe(
          data => { this.retornoReservaSucesso(data); this.patinhas.executeBar = false; },
          error => { this.toastr.errorToastr(error.error.message, 'Erro: '); this.patinhas.executeBar = false; }
        );
    }
    this.patinhas.executeBar = false;
  }

  private retornoReservaSucesso(reserva: any) {
    this.toastr.successToastr('Reserva enviada com sucesso! Ticket: ' + reserva.ticket);
    this.limparCampos();
  }

  public limparCampos() {
    this.nomeDono = "";
    this.nomePet = "";
    this.residencial = "";
    this.celular = "";
    this.email = "";
    this.fromDate = new Date(null);
    this.toDate = new Date(null);
    this.raca = "";
    this.comentario = "";
    this.tipoPet = "";
  }

  private montarReserva() {
    this.reserva = {
      reservaId: this.reservaId,
      nomeDono: this.nomeDono,
      nomePet: this.nomePet,
      tipoPet: this.tipoPet,
      raca: this.raca,
      residencial: this.residencial,
      celular: this.celular,
      email: this.email,
      comentario: this.comentario,
      fromDate: this.fromDate,
      toDate: this.toDate,
      ticket: this.ticket,
      estado: KdEstado[this.estado],
      userid: this.patinhas.currentUserValue().id,
      portePet: this.portePet,
      idadePet: this.idadePet
    };
  }

  private validarDados(): boolean {
    this.hasErro = false;
    if (!this.nomeDono) {
      this.toastr.errorToastr('Nome do dono deve ser preenchido', 'Erro: ');
      this.hasErro = true;
    }

    if (!this.nomePet) {
      this.toastr.errorToastr('Nome do iti malia deve ser preenchido', 'Erro: ');
      this.hasErro = true;
    }

    if (!this.tipoPet) {
      this.toastr.errorToastr('O Tipo do pet deve ser selecionado', 'Erro: ');
      this.hasErro = true;
    }

    if (!this.raca) {
      this.toastr.errorToastr('A raça deve ser preenchida', 'Erro: ');
      this.hasErro = true;
    }

    if (!this.celular) {
      this.toastr.errorToastr('Telefone celular deve ser preenchido', 'Erro: ');
      this.hasErro = true;
    }

    if (!this.email) {
      this.toastr.errorToastr('O email deve ser preenchido', 'Erro: ');
      this.hasErro = true;
    }

    if (!this.fromDate) {
      this.toastr.errorToastr('Uma data deve ser escolhida', 'Erro: ');
      this.hasErro = true;
    }

    if (this.toDate) {
      if (this.toDate < this.fromDate) {
        this.toastr.errorToastr('A data "Até" não pode ser menor que a "De"');
        this.hasErro = true;
      }
    }

    if (!this.idadePet) {
      this.toastr.errorToastr('A idade do pet deve ser informada');
      this.hasErro = true;
    }

    if (!this.portePet) {
      this.toastr.errorToastr('O porte do pet deve ser informado');
      this.hasErro = true;
    }


    return this.hasErro;
  }

  public pesquisarTicket(): void {
    if (!this.ticket) {
      this.toastr.warningToastr('Por favor preencher o ticket');
    }
    else {
      this.patinhas.executeBar = true;
      this.service.pesquisarTicket(this.ticket, this.patinhas.currentUserValue().id)
        .subscribe(
          data => {
            this.makeReserva(data);
            this.patinhas.executeBar = false;
          },
          error => { this.toastr.errorToastr(error.error.message, 'Erro: '); this.patinhas.executeBar = false; }
        );
    }
  }

  private makeReserva(reserva: any) {
    this.isEdit = true;
    this.celular = reserva.celular;
    this.comentario = reserva.comentario;
    this.email = reserva.email;
    this.fromDate = new Date(reserva.fromDate);
    if (!reserva.toDate.toString().includes('0001-01-01')) {
      this.toDate = new Date(reserva.toDate);
    }
    this.nomeDono = reserva.nomeDono;
    this.nomePet = reserva.nomePet;
    this.raca = reserva.raca;
    this.residencial = reserva.residencial;
    this.reservaId = reserva.reservaId;
    this.tipoPet = reserva.tipoPet;
    this.estado = KdEstado[reserva.estado];
    this.idadePet = reserva.idadePet;
    this.portePet = reserva.portePet;
  }

  private atualizarReserva() {
    this.patinhas.executeBar = true;
    if (!this.validarDados()) {
      this.montarReserva();
      this.service.enviarEmailAtualizacao(this.reserva).subscribe(
        data => {
          this.service.atualizarReserva(this.reserva)
            .subscribe(
              data => {
                this.toastr.successToastr('Reserva atualizada com sucesso');
                this.limparCampos();
                this.patinhas.executeBar = false;
              },
              error => { this.toastr.errorToastr(error, 'Erro: '); this.patinhas.executeBar = false; }
            );
        },
        error => { this.toastr.errorToastr(error, 'Erro: '); }
      );
    }
    this.patinhas.executeBar = false;
  }

  private cancelarReserva() {
    this.montarReserva();
    this.service.cancelarReserva(this.reserva)
      .subscribe(
        data => { this.toastr.successToastr('Reserva cancelada com sucesso'); this.limparCampos(); },
        error => { this.toastr.errorToastr(error); }
      );
  }
}
