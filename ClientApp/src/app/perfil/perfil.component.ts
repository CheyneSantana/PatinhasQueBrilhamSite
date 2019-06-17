import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { UserService } from '../user.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { first } from 'rxjs/operators';
import { User } from 'src/Models/User';
import { MatDialogRef } from '@angular/material';
import { PatinhasService } from '../patinhas.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  public hideSenhaAntiga = true;
  public hideSenhaNova = true;
  public hideSenhaValidar = true;
  public loading = false;
  public submitted = false;
  public nome: string;
  public sobrenome: string;
  public telCel: string;
  public telRes: string;
  public email: string;
  public senhaNova: string;
  public senhaValidar: string;
  public senhaAntiga: string;
  public user: User;
  public id: number;
  public token: string;

  constructor(private router: Router,
    private authencticationService: AuthenticationService,
    private userService: UserService,
    private toastr: ToastrManager,
    public dialogRef: MatDialogRef<PerfilComponent>,
    private patinhas: PatinhasService) {

  }

  ngOnInit() {
    if (this.authencticationService.currentUserValue)
      this.makeTela();
    else
      this.closeDialog();
  }

  public atualizar(): void {
    this.submitted = true;
    this.patinhas.executeBar = true;
    if (!this.validar()) {
      this.montarUser();
      this.loading = true;
      this.userService.update(this.user)
        .pipe(first())
        .subscribe(
          data => {
            this.toastr.successToastr('Atualizado com sucesso');
            this.closeDialog();
            this.patinhas.executeBar = false;
          },
          error => {
            this.toastr.errorToastr(error.error.message);
            this.loading = false;
            this.patinhas.executeBar = false;
          });
    }
    this.patinhas.executeBar = false;
  }

  private validar(): boolean {
    var hasErro = false;
    if (!this.nome) {
      this.toastr.errorToastr('Insira o seu nome');
      hasErro = true;
    }

    if (!this.sobrenome) {
      this.toastr.errorToastr('Insira o seu sobrenome');
      hasErro = true;
    }

    if (!this.email) {
      this.toastr.errorToastr('Insira seu email');
      hasErro = true;
    }

    if (this.senhaNova) {
      this.toastr.errorToastr('Insira a nova senha');
      hasErro = true;

      if (!this.senhaAntiga) {
        this.toastr.errorToastr('Insira a senha antiga');
        hasErro = true;
      } else {
        const user = {
          email: this.authencticationService.currentUserValue.email,
          nome: this.authencticationService.currentUserValue.nome,
          telCel: this.authencticationService.currentUserValue.telCel,
          telRes: this.authencticationService.currentUserValue.telRes,
          sobrenome: this.authencticationService.currentUserValue.sobrenome,
          id: this.authencticationService.currentUserValue.id,
          password: this.senhaAntiga,
          token: this.authencticationService.currentUserValue.token
        };

        this.userService.validarSenhaAntiga(user)
          .subscribe(
            data => { },
            error => { this.toastr.errorToastr(error.error.message); hasErro = true; }
          );
      }

      if (!this.senhaValidar) {
        this.toastr.errorToastr('Necessário repetir a nova senha');
        hasErro = true;
      } else if (this.senhaNova !== this.senhaValidar) {
        this.toastr.errorToastr('Senhas não conferem');
        hasErro = true;
      }
    }

    return hasErro;
  }

  private montarUser(): void {
    this.user = {
      email: this.email,
      nome: this.nome,
      telCel: this.telCel,
      telRes: this.telRes,
      sobrenome: this.sobrenome,
      id: this.id,
      password: this.senhaNova,
      token: this.token
    }
  }

  private makeTela(): void {
    this.email = this.authencticationService.currentUserValue.email;
    this.nome = this.authencticationService.currentUserValue.nome;
    this.sobrenome = this.authencticationService.currentUserValue.sobrenome;
    this.telCel = this.authencticationService.currentUserValue.telCel;
    this.telRes = this.authencticationService.currentUserValue.telRes;
    this.id = this.authencticationService.currentUserValue.id;
    this.token = this.authencticationService.currentUserValue.token;
    this.senhaAntiga = '';
    this.senhaNova = '';
    this.senhaValidar = '';
  }

  public closeDialog(): void {
    this.dialogRef.close();
  }
}
