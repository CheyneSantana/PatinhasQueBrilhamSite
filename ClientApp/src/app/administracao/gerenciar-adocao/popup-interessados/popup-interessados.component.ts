import { GerenciarAdocaoComponent } from './../gerenciar-adocao.component';
import { AnimaisAdocao, KdAtivo } from './../../../../Models/AnimaisAdocao';
import { Component, OnInit, Inject } from '@angular/core';
import { AdocaoService } from 'src/app/adocao.service';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrManager } from 'ng6-toastr-notifications';
import { PopupDetalhesComponent } from './popup-detalhes/popup-detalhes.component';
import { AdotanteDTO, KdEstado } from 'src/Models/AdotanteDTO';
import { element } from '@angular/core/src/render3';

@Component({
  selector: 'app-popup-interessados',
  templateUrl: './popup-interessados.component.html',
  styleUrls: ['./popup-interessados.component.scss']
})
export class PopupInteressadosComponent implements OnInit {
  private animal: AnimaisAdocao;
  adotantes: AdotanteDTO[];
  kdEstado: KdEstado;
  execSpinner = false;
  private KdAtivo = KdAtivo;
  private ativa = true;

  constructor(
    private adocaoService: AdocaoService,
    public dialogRef: MatDialogRef<PopupInteressadosComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: AnimaisAdocao,
    public toastr: ToastrManager) { }

  ngOnInit() {
    this.animal = this.data;
    this.getAdotantes();
  }

  getAdotantes(): void {
    this.adocaoService.getAdotantesAnimal(this.animal)
      .subscribe(
        data => { this.retornoGetAdotantes(data); },
        error => {
          if (error.error.message) {
            this.toastr.errorToastr(error.error.message);
          } else {
            this.toastr.errorToastr(error.message);
          }
        }
      );
  }

  retornoGetAdotantes(adotantes: any): void {
    this.adotantes = adotantes;
  }

  fechar(): void {
    this.dialogRef.close();
  }

  detalhes(adotante: AdotanteDTO): void {
    const dialogRef = this.dialog.open(PopupDetalhesComponent, {
      width: '370px',
      height: '600px',
      data: adotante
    });
  }

  confirmarAdocao(adotante: AdotanteDTO): void {
    this.execSpinner = true;
    this.adocaoService.confirmarAdocao(adotante)
      .subscribe(
        data => {
          this.toastr.successToastr('Adoção confirmada com sucesso!');
          this.execSpinner = false;
          this.getAdotantes();
        },
        error => {
          if (error.error.message) {
            this.toastr.errorToastr(error.error.message);
          } else {
            this.toastr.errorToastr(error.message);
          }
          this.execSpinner = false;
        }
      );
    this.execSpinner = false;
  }

  cancelar(adotante: AdotanteDTO): void {
    this.execSpinner = true;
    this.adocaoService.cancelarSolicitacao(adotante)
      .subscribe(
        data => {
          this.toastr.successToastr('Adoção cancelada com sucesso!');
          this.execSpinner = false;
          this.getAdotantes();
        },
        error => {
          if (error.error.message) {
            this.toastr.errorToastr(error.error.message);
          } else {
            this.toastr.errorToastr(error.message);
          }
          this.execSpinner = false;
        }
      );
    this.execSpinner = false;
  }

  desativar(animal: AnimaisAdocao): void {
    animal.ativo = this.KdAtivo.Não;
    this.adocaoService.atualizarAnimal(animal).
      subscribe(
        data => {
          this.toastr.successToastr('Animal removido da lista de adoção com sucesso!');
        },
        error => {
          if (error.error.message) {
            this.toastr.errorToastr(error.error.message);
          } else {
            this.toastr.errorToastr(error.message);
          }
          animal.ativo = this.KdAtivo.Sim;
        }
      );
  }

  ativar(animal: AnimaisAdocao): void {
    animal.ativo = this.KdAtivo.Sim;
    this.adocaoService.atualizarAnimal(animal).
      subscribe(
        data => {
          this.toastr.successToastr('Animal adicionado na lista de adoção com sucesso!');
        },
        error => {
          if (error.error.message) {
            this.toastr.errorToastr(error.error.message);
          } else {
            this.toastr.errorToastr(error.message);
          }
          animal.ativo = this.KdAtivo.Não;
        }
      );
  }
}
