import { FormularioDTO } from './../../Models/FormularioDTO';
import { Inject, Component, OnInit } from '@angular/core';
import { AdocaoService } from '../adocao.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { MatDialogRef, MAT_DIALOG_DATA, MatDatepickerInputEvent, MatDialog } from '@angular/material';
import { PatinhasService } from '../patinhas.service';
import { ViaCEPResult } from '../../Models/ViaCEPResult';
import { AnimaisAdocao } from '../../Models/AnimaisAdocao';
import { regExpEscape } from '@ng-bootstrap/ng-bootstrap/util/util';
import { PopUpAvisoAdocao } from './PopUpAvisoAdocao';

@Component({
  selector: 'PopUpAdocao',
  templateUrl: 'PopUpAdocao.html',
  styleUrls: ['./PopUpAdocao.scss']
})
export class PopUpAdocao implements OnInit {
  public nomeAdotante: string;
  public dtNascimento: Date;
  public rg: string;
  public cpf: string;
  public cep: string;
  public endereco: string;
  public numero: string;
  public complemento: string;
  public bairro: string;
  public cidade: string;
  public uf: string;
  public profissao: string;
  public telRes: string;
  public telCel: string;
  private formulario: FormularioDTO;

  constructor(private adocaoService: AdocaoService,
    private toastr: ToastrManager,
    public dialogRef: MatDialogRef<PopUpAdocao>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private patinhas: PatinhasService) { }

  ngOnInit(): void {
    this.preencherTela();
  }

  private preencherTela(): void {
    if (this.patinhas.logged()) {
      this.nomeAdotante = this.patinhas.currentUserValue().nome + ' ' + this.patinhas.currentUserValue().sobrenome;
      this.telCel = this.patinhas.currentUserValue().telCel;
      this.telRes = this.patinhas.currentUserValue().telRes;
    }
  }

  public selectedNascimento(event: MatDatepickerInputEvent<Date>): void {
    this.dtNascimento = new Date(event.value.getFullYear(), event.value.getMonth(), event.value.getDate());
  }

  public cancelar(): void {
    this.dialogRef.close();
  }

  public enviarSolicitacao(): void {
    this.patinhas.executeBar = true;
    if (!this.validar()) {
      this.makeFormulario();
      this.adocaoService.enviarSolicitacao(this.formulario)
        .subscribe(
          data => {
            this.toastr.successToastr('Solicitação enviada com sucesso');
            this.openAviso();
            this.cancelar();
            this.patinhas.executeBar = false;
          },
          error => { this.toastr.errorToastr(error.error.message, 'Erro: '); this.patinhas.executeBar = false; }
        );
    } else {
      this.patinhas.executeBar = false;
    }
  }

  private openAviso(): void {
    const dialogRef = this.dialog.open(PopUpAvisoAdocao, {
      width: 'auto',
      height: 'auto'
    });
  }

  private makeFormulario(): void {
    this.formulario = {
      Nome: this.nomeAdotante,
      DtNascimento: this.dtNascimento,
      RG: this.rg,
      CPF: this.cpf,
      CEP: this.cep,
      Endereco: this.endereco,
      NroEndereco: parseInt(this.numero),
      Complemento: this.complemento,
      Bairro: this.bairro,
      Cidade: this.cidade,
      UF: this.uf,
      Profissao: this.profissao,
      TelRes: this.telRes,
      TelCel: this.telCel,
      AnimaisAdocaoId: this.data.animaisAdocaoId
    };
  }

  private validar(): boolean {
    var hasErro = false;

    if (!this.nomeAdotante) {
      this.toastr.errorToastr('Informar o nome');
      hasErro = true;
    }

    if (!this.dtNascimento) {
      this.toastr.errorToastr('Informar a data de nascimento');
      hasErro = true;
    }

    if (!this.rg) {
      this.toastr.errorToastr('Informar o RG');
      hasErro = true;
    }

    if (!this.cpf) {
      this.toastr.errorToastr('Informar o CPF');
      hasErro = true;
    }

    if (!this.cep) {
      this.toastr.errorToastr('Informar o CEP');
      hasErro = true;
    }

    if (!this.numero) {
      this.toastr.errorToastr('Informar o número do endereço');
      hasErro = true;
    }

    if (!this.profissao) {
      this.toastr.errorToastr('Informar a profissão');
      hasErro = true;
    }

    if (!this.telCel) {
      this.toastr.errorToastr('Informar o celular');
      hasErro = true;
    }

    return hasErro;
  }

  public buscarCep(): void {
    this.patinhas.executeBar = true;
    if (this.cep) {
      this.adocaoService.buscarCep(this.cep)
        .subscribe(
          data => {
            this.retornoBuscarCep(data);
            this.patinhas.executeBar = false;
          }
        );
    } else {
      this.toastr.errorToastr('Por favor insira o CEP');
      this.patinhas.executeBar = false;
    }
  }

  private retornoBuscarCep(data: any): void {
    this.endereco = data.logradouro;
    this.bairro = data.bairro;
    this.cidade = data.localidade;
    this.uf = data.uf;
  }
}
