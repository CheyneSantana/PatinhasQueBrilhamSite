import { Component, OnInit, Inject } from '@angular/core';
import { AnimaisAdocao } from 'src/Models/AnimaisAdocao';
import { AdocaoService } from 'src/app/adocao.service';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-popup-editar-animal',
  templateUrl: './popup-editar-animal.component.html',
  styleUrls: ['./popup-editar-animal.component.scss']
})
export class PopupEditarAnimalComponent implements OnInit {
  execbar = false;
  private animal: AnimaisAdocao;
  nomeAntigo: string;
  nomeAtual: string;
  idade: number;
  adulto: number;
  sexo: number;
  corPelagem: string;
  raca: string;
  especie: number;
  porte: number;
  castrado: number;
  vermifugado: number;
  raiva: number;
  v10: number;
  quadrupla: number;
  dose: number;
  microship: number;
  rga: number;
  adultos = [
    { value: 0, viewValue: 'Filhote' },
    { value: 1, viewValue: 'Adulto' }
  ];

  sexos = [
    { value: 0, viewValue: 'Fêmea' },
    { value: 1, viewValue: 'Macho' }
  ];

  especies = [
    { value: 0, viewValue: 'Cão' },
    { value: 1, viewValue: 'Gato' }
  ];

  portes = [
    { value: 0, viewValue: 'Pequeno' },
    { value: 1, viewValue: 'Médio' },
    { value: 2, viewValue: 'Grande' }
  ];

  logicals = [
    { value: 0, viewValue: 'Não' },
    { value: 1, viewValue: 'Sim' }
  ];

  constructor(
    private adocaoService: AdocaoService,
    public dialogRef: MatDialogRef<PopupEditarAnimalComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: AnimaisAdocao,
    public toastr: ToastrManager
  ) { }

  ngOnInit() {
    this.animal = this.data;
    this.montarTela();
  }

  fechar() {
    this.dialogRef.close();
  }

  salvar() {
    this.montarAnimal();
    this.adocaoService.atualizarAnimal(this.animal)
    .subscribe(
      data => {
        this.toastr.successToastr('Animal atualizado com sucesso!');
        this.fechar();
      },
      error => {
        if (error.error.message) {
          this.toastr.errorToastr(error.error.message);
        } else {
          this.toastr.errorToastr(error.message);
        }
      }
    );
  }

  private montarAnimal() {
    this.animal.nomeAntigo = this.nomeAntigo;
    this.animal.nomeAtual = this.nomeAtual;
    this.animal.idade = this.idade;
    this.animal.corPelagem = this.corPelagem;
    this.animal.raca = this.raca;
    this.animal.microchip = this.microship;
    this.animal.rga = this.rga;
    this.animal.adulto = this.adulto;
    this.animal.sexo = this.sexo;
    this.animal.especie = this.especie;
    this.animal.porte = this.porte;
    this.animal.castrado = this.castrado;
    this.animal.vermifugado = this.vermifugado;
    this.animal.raiva = this.raiva;
    this.animal.v10 = this.v10;
    this.animal.quadrupla = this.quadrupla;
    this.animal.dose = this.dose;
  }

  private montarTela() {
    this.nomeAntigo = this.animal.nomeAntigo;
    this.nomeAtual = this.animal.nomeAtual;
    this.idade = this.animal.idade;
    this.corPelagem = this.animal.corPelagem;
    this.raca = this.animal.raca;
    this.microship = this.animal.microchip;
    this.rga = this.animal.rga;
    this.adulto = this.animal.adulto;
    this.sexo = this.animal.sexo;
    this.especie = this.animal.especie;
    this.porte = this.animal.porte;
    this.castrado = this.animal.castrado;
    this.vermifugado = this.animal.vermifugado;
    this.raiva = this.animal.raiva;
    this.v10 = this.animal.v10;
    this.quadrupla = this.animal.quadrupla;
    this.dose = this.animal.dose;
  }
}
