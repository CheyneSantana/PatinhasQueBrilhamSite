import { MatDialog } from '@angular/material';
import { PopupExcluirAnimalComponent } from './popup-excluir-animal/popup-excluir-animal.component';
import { PopupEditarAnimalComponent } from './popup-editar-animal/popup-editar-animal.component';
import { PopupInteressadosComponent } from './popup-interessados/popup-interessados.component';
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
  public animais: AnimaisAdocao[];
  public nomeAnimal: string;

  constructor(
    private adocaoService: AdocaoService,
    private toastr: ToastrManager,
    public dialog: MatDialog
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

  public pesquisar(): void {
    this.adocaoService.getNomeAnimal(this.nomeAnimal)
      .subscribe(
        data => { this.returnGetAnimais(data); },
        error => { this.toastr.errorToastr(error.error.message); }
      );
  }

  public openInteressados(animal: AnimaisAdocao): void {
    const dialogRef = this.dialog.open(PopupInteressadosComponent, {
      width: '370px',
      height: '600px',
      data: animal
    });
  }

  public openEditarAnimal(animal: AnimaisAdocao): void {
    const dialogRef = this.dialog.open(PopupEditarAnimalComponent, {
      width: '370px',
      height: '600px',
      data: animal
    });
  }

  public excluir(animal: AnimaisAdocao): void {
    const dialogRef = this.dialog.open(PopupExcluirAnimalComponent, {
      width: '370px',
      height: '600px',
      data: animal
    });
  }
}
