import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { UserService } from '../user.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { first } from 'rxjs/operators';
import { MatDialogRef } from '@angular/material';
import { User } from '../../Models/User';
import { PatinhasService } from '../patinhas.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public hide = true;
  public loading = false;
  public submitted = false;
  public nome: string;
  public sobrenome: string;
  public email: string;
  public senha: string;
  public senhaValidar: string;
  public telRes: string;
  public telCel: string;
  public user: User;

  constructor(
    private router: Router,
    private patinhas: PatinhasService,
    private userService: UserService,
    private toastr: ToastrManager,
    public dialogRef: MatDialogRef<RegisterComponent>
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
    this.patinhas.executeBar = true;
    if (!this.validar()) {
      this.montarUser();
      this.loading = true;
      this.userService.register(this.user)
        .pipe(first())
        .subscribe(
          data => {
            this.toastr.successToastr('Registrado com sucesso');
            this.toastr.warningToastr('Por favor acesse sua conta');
            this.closeDialog();
            this.patinhas.executeBar = false;
          },
          error => {
            if (error.error.message) {
              this.toastr.errorToastr(error.error.message);
            } else {
              this.toastr.errorToastr(error.message);
            }
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
    } else {
      if (!this.email.includes('@')) {
        this.toastr.errorToastr('Email inválido');
        hasErro = true;
      } else {
        if (!this.email.includes('.com')) {
          this.toastr.errorToastr('Email inválido');
          hasErro = true;
        }
      }
    }

    if (!this.telCel) {
      this.toastr.errorToastr('Insira seu celular');
      hasErro = true;
    }

    if (!this.senha) {
      this.toastr.errorToastr('Insira uma senha');
      hasErro = true;
    }

    if (!this.senhaValidar) {
      this.toastr.errorToastr('Necessário repetir a senha');
      hasErro = true;
    } else if (this.senha !== this.senhaValidar) {
      this.toastr.errorToastr('Senhas não conferem');
      hasErro = true;
    }

    return hasErro;
  }

  private montarUser(): void {
    this.user = {
      email: this.email,
      nome: this.nome,
      sobrenome: this.sobrenome,
      telRes: this.telRes,
      telCel: this.telCel,
      id: 0,
      password: this.senha,
      token: '',
      isAdmin: false
    };
  }

  public closeDialog(): void {
    this.dialogRef.close();
  }

}
