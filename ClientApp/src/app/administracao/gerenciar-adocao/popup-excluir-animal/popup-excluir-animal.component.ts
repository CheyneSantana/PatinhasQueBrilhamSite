import { AnimaisAdocao } from 'src/Models/AnimaisAdocao';
import { Component, OnInit, Inject } from '@angular/core';
import { AdocaoService } from 'src/app/adocao.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-popup-excluir-animal',
  templateUrl: './popup-excluir-animal.component.html',
  styleUrls: ['./popup-excluir-animal.component.scss']
})
export class PopupExcluirAnimalComponent implements OnInit {
  animal: AnimaisAdocao;

  constructor(
    private adocaoService: AdocaoService,
    public dialogRef: MatDialogRef<PopupExcluirAnimalComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public toastr: ToastrManager) { }

  ngOnInit() {
    this.animal = this.data;
  }

  confirmar(): void {
    this.adocaoService.excluirAnimal(this.animal.animaisAdocaoId.toString())
      .subscribe(
        data => {
          this.toastr.successToastr('Animal excluído com sucesso!');
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

  fechar(): void {
    this.dialogRef.close();
  }

}
