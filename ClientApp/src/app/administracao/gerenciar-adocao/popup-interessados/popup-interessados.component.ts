import { AnimaisAdocao } from './../../../../Models/AnimaisAdocao';
import { Component, OnInit, Inject } from '@angular/core';
import { AdocaoService } from 'src/app/adocao.service';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrManager } from 'ng6-toastr-notifications';
import { PopupDetalhesComponent } from './popup-detalhes/popup-detalhes.component';
import { AdotanteDTO, KdEstado } from 'src/Models/AdotanteDTO';

@Component({
  selector: 'app-popup-interessados',
  templateUrl: './popup-interessados.component.html',
  styleUrls: ['./popup-interessados.component.scss']
})
export class PopupInteressadosComponent implements OnInit {
  private animal: AnimaisAdocao;
  adotantes: AdotanteDTO[];
  KdEstado: KdEstado;

  constructor(
    private adocaoService: AdocaoService,
    public dialogRef: MatDialogRef<PopupInteressadosComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
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
      width: 'auto',
      height: 'auto',
      data: adotante
    });
  }

  confirmarAdocao(adotante: AdotanteDTO): void {
    this.adocaoService.confirmarAdocao(adotante)
      .subscribe(
        data => { this.toastr.successToastr('Adoção confirmada com sucesso!'); },
        error => {
          if (error.error.message) {
            this.toastr.errorToastr(error.error.message);
          } else {
            this.toastr.errorToastr(error.message);
          }
        }
      );
  }

  cancelar(adotante: AdotanteDTO): void {
    this.adocaoService.cancelarSolicitacao(adotante)
    .subscribe(
      data => { this.toastr.successToastr('Adoção cancelada com sucesso!'); },
      error => {
        if (error.error.message) {
          this.toastr.errorToastr(error.error.message);
        } else {
          this.toastr.errorToastr(error.message);
        }
      }
    );
  }

}
