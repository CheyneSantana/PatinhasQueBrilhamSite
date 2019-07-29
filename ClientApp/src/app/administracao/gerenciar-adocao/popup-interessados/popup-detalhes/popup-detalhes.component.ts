import { AdotanteDTO } from 'src/Models/AdotanteDTO';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-popup-detalhes',
  templateUrl: './popup-detalhes.component.html',
  styleUrls: ['./popup-detalhes.component.scss']
})
export class PopupDetalhesComponent implements OnInit {
  adotante: AdotanteDTO;

  constructor(
    public dialogRef: MatDialogRef<PopupDetalhesComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.adotante = this.data;
  }

  fechar(): void {
    this.dialogRef.close();
  }

}
