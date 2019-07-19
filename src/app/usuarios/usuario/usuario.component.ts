import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import * as fromActions from '../../store/actions';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: []
})

export class UsuarioComponent implements OnInit {

  usuario: Usuario = {
    id: 0,
    email: '',
    first_name: '',
    last_name: '',
    avatar: '',
  } ;

  loading: boolean;
  error: any;

  constructor(
      private activatedRoute: ActivatedRoute,
      private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe( params => {
        const pmtId = params['id'];
        this.store.dispatch( fromActions.cargarUsuario({id: pmtId}));
      });

    this.store.select('usuario')
      .subscribe( usuarioState => {
        if ( usuarioState.user) {
          this.usuario = usuarioState.user;
          this.loading = usuarioState.loading;
          this.error = usuarioState.error;
        }
      });
  }

}
