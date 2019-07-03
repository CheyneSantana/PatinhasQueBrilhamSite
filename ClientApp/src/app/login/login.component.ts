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
    if (!this.validar()) {
      this.loading = true;
      this.patinhas.login(this.email, this.senha)
        .pipe(first())
        .subscribe(
          data => { this.toastr.successToastr('Acessado com sucesso!'); this.closeDialog(); },
          error => { this.toastr.errorToastr(error.error.message); this.loading = false; }
        );
    }
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
      this.toastr.errorToastr("Por favor insira seu email");
      this.patinhas.executeBar = false;
    }
    else {
      this.montarUser();
      this.patinhas.resetarSenha(this.user)
        .subscribe(
          data => { this.toastr.successToastr('Uma nova senha foi enviada para seu email'); this.patinhas.executeBar = false;},
          error => { this.toastr.errorToastr(error.error.message); this.patinhas.executeBar = false;}
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
