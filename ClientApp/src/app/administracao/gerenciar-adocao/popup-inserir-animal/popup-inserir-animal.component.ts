import { UploadFotoComponent } from './upload-foto/upload-foto.component';
import { Component, OnInit, Inject } from '@angular/core';
import { AdocaoService } from 'src/app/adocao.service';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { AnimaisAdocao, KdAtivo } from 'src/Models/AnimaisAdocao';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-popup-inserir-animal',
  templateUrl: './popup-inserir-animal.component.html',
  styleUrls: ['./popup-inserir-animal.component.scss']
})
export class PopupInserirAnimalComponent implements OnInit {
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
  fileData: File = null;
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
    public dialogRef: MatDialogRef<PopupInserirAnimalComponent>,
    public dialog: MatDialog,
    public toastr: ToastrManager) { }

  ngOnInit() {
  }

  fechar() {
    this.dialogRef.close();
  }

  salvar() {
    this.execbar = true;
    this.montarAnimal();
    this.adocaoService.inserirAnimalAdocao(this.animal)
      .subscribe(
        data => {
          this.toastr.successToastr('Animal inserido com sucesso!');
          this.execbar = false;
          this.fechar();
          this.openUpload(data);
        },
        error => {
          if (error.error.message) {
            this.toastr.errorToastr(error.error.message);
          } else {
            this.toastr.errorToastr(error.message);
          }
          this.execbar = false;
        }
      );
  }

  private montarAnimal() {
    this.animal = {
      nomeAntigo: this.nomeAntigo,
      nomeAtual: this.nomeAtual,
      idade: this.idade,
      corPelagem: this.corPelagem,
      raca: this.raca,
      microchip: this.microship,
      rga: this.rga,
      adulto: this.adulto,
      sexo: this.sexo,
      especie: this.especie,
      porte: this.porte,
      castrado: this.castrado,
      vermifugado: this.vermifugado,
      raiva: this.raiva,
      v10: this.v10,
      quadrupla: this.quadrupla,
      dose: this.dose,
      animaisAdocaoId: 0,
      pathFoto: null,
      ativo: KdAtivo.Sim
    };

  }

  private openUpload(animal: any): void {
    const dialogRef = this.dialog.open(UploadFotoComponent, {
      width: 'auto',
      height: 'auto',
      data: animal
    });
  }
}
