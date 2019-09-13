import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { User } from '../Models/User';

@Injectable({
  providedIn: 'root'
})
export class PatinhasService {
  public executeBar = false;

  constructor(public authenticationService: AuthenticationService) { }

  public logout(): void {
    this.authenticationService.logout();
  }

  public login(email: string, senha: string) {
    return this.authenticationService.login(email, senha);
  }

  public resetarSenha(email: string) {
    return this.authenticationService.resetarSenha(email);
  }

  public currentUserValue(): User {
    return this.authenticationService.currentUserValue;
  }

  public logged(): boolean {
    return this.authenticationService.logged;
  }

  public getBaseUrl(): string {
    return this.authenticationService.baseUrl;
  }

  public isAdmin(): boolean {
    return this.authenticationService.isAdmin;
  }
}
