import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { first } from 'rxjs/operators';
import { MatDialog, MatDialogRef } from '@angular/material';
import { RegisterComponent } from '../register/register.component';
import { User } from '../../Models/User';
import { PatinhasService } from '../patinhas.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loading = false;
  public submitted = false;
  public returnUrl: string;
  public email: string;
  public senha: string;
  public user: User;
  public hide = true;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrManager,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<LoginComponent>,
    private patinhas: PatinhasService
  ) {  }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
    this.patinhas.executeBar = true;
    if (!this.validar()) {
      this.loading = true;
      this.patinhas.login(this.email, this.senha)
        .pipe(first())
        .subscribe(
          data => { this.toastr.successToastr('Acessado com sucesso!'); this.closeDialog(); this.patinhas.executeBar = false; },
          error => {
            if (error.error.message) {
              this.toastr.errorToastr(error.error.message);
            } else {
              this.toastr.errorToastr(error.message);
            }
            this.patinhas.executeBar = false;
            this.loading = false;
          }
        );
    }
    this.patinhas.executeBar = false;
  }

  private validar(): boolean {
    var hasErro = false;

    if (!this.email) {
      this.toastr.errorToastr('Insira o usuário');
      hasErro = true;
    }

    if (!this.senha) {
      this.toastr.errorToastr('Insira a senha');
      hasErro = true;
    }

    return hasErro;
  }

  public openDialog(): void {
    const diaogRef = this.dialog.open(RegisterComponent, {
      width: '370px',
        height: '600px'
    });
  }

  private closeDialog(): void {
    this.dialogRef.close();
  }

  public resetarSenha(): void {
    this.patinhas.executeBar = true;
    if (!this.email) {
      this.toastr.errorToastr('Por favor insira seu email');
      this.patinhas.executeBar = false;
    } else {
      this.patinhas.resetarSenha(this.email)
        .subscribe(
          data => { this.toastr.successToastr('Uma nova senha foi enviada para seu email'); this.patinhas.executeBar = false;},
          error => {
            if (error.error.message) {
              this.toastr.errorToastr(error.error.message);
            } else {
              this.toastr.errorToastr(error.message);
            }
            this.patinhas.executeBar = false;
          }
        );
    }
  }

  private montarUser(): void {
    this.user = {
      email: this.email,
      nome: '',
      telCel: '',
      telRes: '',
      sobrenome: '',
      id: 0,
      password: '',
      isAdmin: false,
      token: ''
    };
  }

}
