import { ToastrManager } from 'ng6-toastr-notifications';
import { AdocaoService } from './../../adocao.service';
import { AnimaisAdocao } from 'src/Models/AnimaisAdocao';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gerenciar-adocao',
  templateUrl: './gerenciar-adocao.component.html',
  styleUrls: ['./gerenciar-adocao.component.scss']
})
export class GerenciarAdocaoComponent implements OnInit {
  animais: AnimaisAdocao[];
  nomeAnimal: string;

  constructor(
    private adocaoService: AdocaoService,
    private toastr: ToastrManager
  ) { }

  ngOnInit() {
    this.getAnimaisAdocao();
  }

  private getAnimaisAdocao(): void {
    this.adocaoService.getAllAnimais()
      .subscribe(
        data => { this.returnGetAnimais(data); },
        error => { this.toastr.errorToastr(error.error.message); }
      );
  }

  private returnGetAnimais(animais: any): void {
    this.animais = animais;
  }

  pesquisar(): void {
    this.adocaoService.getNomeAnimal(this.nomeAnimal)
      .subscribe(
        data => { this.returnGetAnimais(data); },
        error => { this.toastr.errorToastr(error.error.message); }
      );
  }

  openInteressados(animal: any): void {

  }

  openEditarAnimal(animal: any): void {

  }

  excluir(animal: any): void {

  }
}
