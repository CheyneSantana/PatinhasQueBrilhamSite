import { PatinhasService } from './../../../../patinhas.service';
import { HttpEvent, HttpEventType, HttpClient } from '@angular/common/http';
import { AnimaisAdocao } from './../../../../../Models/AnimaisAdocao';
import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { AdocaoService } from 'src/app/adocao.service';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { PopupInserirAnimalComponent } from '../popup-inserir-animal.component';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-upload-foto',
  templateUrl: './upload-foto.component.html',
  styleUrls: ['./upload-foto.component.scss']
})
export class UploadFotoComponent implements OnInit {
  animal: AnimaisAdocao;
  progress: number;
  @Output() public onUploadFinished = new EventEmitter();

  constructor(
    private adocaoService: AdocaoService,
    public dialogRef: MatDialogRef<PopupInserirAnimalComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public toastr: ToastrManager,
    private http: HttpClient,
    private patinhas: PatinhasService
  ) { }

  ngOnInit() {
    this.animal = this.data;
  }

  fechar() {
    this.dialogRef.close();
  }

  uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }

    let fileToUpload = files[0] as File;
    console.log(fileToUpload);
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    this.http.post(this.patinhas.getBaseUrl() + '/Adocao/' + 'UploadImagem', formData, { reportProgress: true, observe: 'events' })
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event.type === HttpEventType.Response) {
          this.toastr.successToastr('Imagem enviada');
          this.onUploadFinished.emit(event.body);
          this.atualizarPathFoto(fileToUpload);
          this.fechar();
        }
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

  atualizarPathFoto(file: File) {
    this.animal.pathFoto = './assets/img/adocao/' + file.name;
    this.adocaoService.atualizarAnimal(this.animal)
      .subscribe(
        data => { },
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
