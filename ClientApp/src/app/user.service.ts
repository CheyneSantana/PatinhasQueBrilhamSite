import { PatinhasService } from './patinhas.service';
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpInterceptor } from '@angular/common/http';
import { User } from 'src/Models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = this.patinhas.getBaseUrl() + "/Users/";

  constructor(private http: HttpClient, private patinhas: PatinhasService) { }

  getAll() {
    return this.http.get<User[]>(this.baseUrl + "GetAll");
  }

  getById(id: number) {
    return this.http.get(this.baseUrl + "GetById/" + id);
  }

  register(user: User) {
    return this.http.post(this.baseUrl + "Register", user);
  }

  update(user: User) {
    return this.http.put(this.baseUrl + "Update/", user);
  }

  delete(id: number) {
    return this.http.delete(this.baseUrl + "Delete/" + id);
  }

  validarSenhaAntiga(user: User) {
    return this.http.post(this.baseUrl + "ValidarSenhaAntiga/", user);
  }
}
