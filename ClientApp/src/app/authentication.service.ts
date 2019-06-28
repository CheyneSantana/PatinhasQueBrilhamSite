import { PatinhasService } from './patinhas.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { MenuComponent } from './menu/menu.component';
import { User } from '../Models/User';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  // public baseUrl = "https://patinhasquebrilhamapi.azurewebsites.net/api";
  public baseUrl = "https://localhost:5001/api";
  public logged: boolean = false;
  public isAdmin: boolean = false;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    return this.http.post<any>(this.baseUrl + "/Users/authenticate", { email, password })
      .pipe(map(user => {
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          this.logged = true;
          this.isAdmin = user.isAdmin;
        }

        return user;
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.logged = false;
    this.router.navigate(['/']);
    this.isAdmin = false;
  }

  resetarSenha(user: User) {
    return this.http.put(this.baseUrl + "/Users/ResetarSenha", user);
  }
}
