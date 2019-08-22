import { PatinhasService } from './../../patinhas.service';
import { MatDialog } from '@angular/material';
import { PopupExcluirAnimalComponent } from './popup-excluir-animal/popup-excluir-animal.component';
import { PopupEditarAnimalComponent } from './popup-editar-animal/popup-editar-animal.component';
import { PopupInteressadosComponent } from './popup-interessados/popup-interessados.component';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AdocaoService } from './../../adocao.service';
import { AnimaisAdocao, KdAtivo } from 'src/Models/AnimaisAdocao';
import { Component, OnInit } from '@angular/core';
import { PopupInserirAnimalComponent } from './popup-inserir-animal/popup-inserir-animal.component';

@Component({
  selector: 'app-gerenciar-adocao',
  templateUrl: './gerenciar-adocao.component.html',
  styleUrls: ['./gerenciar-adocao.component.scss']
})
export class GerenciarAdocaoComponent implements OnInit {
  public animais: AnimaisAdocao[];
  public nomeAnimal: string;
  private KdAtivo = KdAtivo;

  constructor(
    private adocaoService: AdocaoService,
    private toastr: ToastrManager,
    public dialog: MatDialog,
    public patinhasService: PatinhasService
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
        error => {
          if (error.error.message) {
            this.toastr.errorToastr(error.error.message);
          } else {
            this.toastr.errorToastr(error.message);
          }
        }
      );
  }

  limparPesquisa(): void {
    this.nomeAnimal = '';
    this.getAnimaisAdocao();
  }

  openInteressados(animal: AnimaisAdocao): void {
    const dialogRef = this.dialog.open(PopupInteressadosComponent, {
      width: '370px',
      height: '600px',
      data: animal
    });

    dialogRef.afterClosed().subscribe(result => {
      this.atualizarPagina();
    });
  }

  openEditarAnimal(animal: AnimaisAdocao): void {
    const dialogRef = this.dialog.open(PopupEditarAnimalComponent, {
      width: '370px',
      height: '600px',
      data: animal
    });

    dialogRef.afterClosed().subscribe(result => {
      this.atualizarPagina();
    });
  }

  excluir(animal: AnimaisAdocao): void {
    const dialogRef = this.dialog.open(PopupExcluirAnimalComponent, {
      width: 'auto',
      height: 'auto',
      data: animal
    });

    dialogRef.afterClosed().subscribe(result => {
      this.atualizarPagina();
    });
  }

  private atualizarPagina(): void {
    this.animais = [];
    this.getAnimaisAdocao();
  }

  desativar(animal: AnimaisAdocao): void {
    this.patinhasService.executeBar = true;
    animal.ativo = this.KdAtivo.Não;
    this.adocaoService.atualizarAnimal(animal).
      subscribe(
        data => {
          this.toastr.successToastr('Animal removido da lista de adoção com sucesso!');
          this.atualizarPagina();
          this.patinhasService.executeBar = false;
        },
        error => {
          if (error.error.message) {
            this.toastr.errorToastr(error.error.message);
          } else {
            this.toastr.errorToastr(error.message);
          }
          animal.ativo = this.KdAtivo.Sim;
          this.patinhasService.executeBar = false;
        }
      );
  }

  ativar(animal: AnimaisAdocao): void {
    this.patinhasService.executeBar = true;
    animal.ativo = this.KdAtivo.Sim;
    this.adocaoService.atualizarAnimal(animal).
      subscribe(
        data => {
          this.toastr.successToastr('Animal adicionado na lista de adoção com sucesso!');
          this.atualizarPagina();
          this.patinhasService.executeBar = false;
        },
        error => {
          if (error.error.message) {
            this.toastr.errorToastr(error.error.message);
          } else {
            this.toastr.errorToastr(error.message);
          }
          animal.ativo = this.KdAtivo.Não;
          this.patinhasService.executeBar = false;
        }
      );
  }

  inserirAnimal() {
    const dialogRef = this.dialog.open(PopupInserirAnimalComponent, {
      width: '370px',
      height: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.atualizarPagina();
    });
  }
}
