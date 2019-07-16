import { Component, OnInit } from '@angular/core';
import { Capa } from '../../Models/Capa';
import { HomeService } from '../home.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

export class Membro {
  nome: string;
  pathFoto: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [NgbCarouselConfig]
})
export class HomeComponent implements OnInit {
  public capas: Capa[] = [];
  public membros: Membro[] = [];
  private angela: Membro;
  private vanessa: Membro;
  private marido: Membro;

  constructor(
    private homeService: HomeService,
    private toastr: ToastrManager,
    config: NgbCarouselConfig) {
    config.interval = 3000;
    config.showNavigationArrows = true;
    config.showNavigationIndicators = true;
  }

  ngOnInit() {
    this.getCapas();
    this.setMembros();
  }

  private getCapas(): void {
    this.homeService.getCapas()
      .subscribe(
        data => { this.retornoGetCapas(data); },
        error => { this.toastr.errorToastr(error.error.message); }
      );
  }

  private retornoGetCapas(capas: any): void {
    this.capas = capas;
  }

  private setMembros() {
    this.angela = { nome: 'Angela', pathFoto: '../../assets/img/membros/angela.jpg' };
    this.vanessa = { nome: 'Vanessa', pathFoto: '../../assets/img/membros/vanessa.jpg' };
    this.marido = { nome: 'Adilson', pathFoto: '../../assets/img/membros/marido.jpg' };

    this.membros.push(this.angela);
    this.membros.push(this.vanessa);
    this.membros.push(this.marido);
  }
}
