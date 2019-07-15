import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private urlBase = 'https://reqres.in/api';
  
  constructor(
    private http: HttpClient
  ) { }

  getUsers() {
    return this.http.get(`${this.urlBase}/users?per_page=6`)
      .pipe( map(resp => resp['data']) );
  }


}
