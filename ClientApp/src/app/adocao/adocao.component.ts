
import { Component, OnInit } from '@angular/core';
import { AdocaoService } from '../adocao.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AnimaisAdocao, KdAtivo, KdVermifugado, KdPorte, KdAdulto, KdSexo } from 'src/Models/AnimaisAdocao';
import { MatDialog } from '@angular/material';
import { PatinhasService } from '../patinhas.service';
import { PopUpAdocao } from './PopUpAdocao';
import { PopUpDetalhes } from './PopUpDetalhes';

@Component({
  selector: 'app-adocao',
  templateUrl: './adocao.component.html',
  styleUrls: ['./adocao.component.scss']
})
export class AdocaoComponent implements OnInit {
  public animais: AnimaisAdocao[] = [];
  public animal: AnimaisAdocao;
  public KdAtivo = KdAtivo;
  public KdVermifugado = KdVermifugado;
  public KdPorte = KdPorte;
  public KdAdulto = KdAdulto;
  public KdSexo = KdSexo;

  constructor(private service: AdocaoService,
    private toastr: ToastrManager,
    public dialog: MatDialog,
    private patinhas: PatinhasService) { }

  ngOnInit() {
    this.getAnimais();
  }

  private getAnimais() {
    this.service.getAnimais()
      .subscribe(
        data => { this.retornoGetAnimais(data); },
        error => {
          if (error.error.message) {
            this.toastr.errorToastr(error.error.message);
          } else {
            this.toastr.errorToastr(error.message);
          }
        }
      );
  }

  private retornoGetAnimais(animais: any) {
    this.animais = animais;
  }

  private openFormulario(event: AnimaisAdocao): void {
    if (this.patinhas.logged()) {
      const dialogRef = this.dialog.open(PopUpAdocao, {
        width: '370px',
        height: '600px',
        data: event
      });
    } else {
      this.toastr.errorToastr('Faça login para preencher o formulário para adoção');
    }
  }

  private openDetalhes(event: AnimaisAdocao): void {
    const dialogRef = this.dialog.open(PopUpDetalhes, {
      width: '400px',
      height: '400px',
      data: event
    });
  }
}
