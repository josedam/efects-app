import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as fromActions from '../actions';
import { UsuarioService } from '../../services/usuario.service';
import { of } from 'rxjs';

@Injectable()
export class UsuarioEffects {
  constructor(
        private actions$: Actions,
        private usuarioService: UsuarioService
        ) {}

  cargarUsuario$ = createEffect(() => this.actions$.pipe(
      ofType(fromActions.cargarUsuario),
      switchMap( accion => {
        const id = accion['id'];
        return this.usuarioService.getUserById(id)
          .pipe(
            map(user => fromActions.cargarUsuarioSuccess({ usuario: user })),
            catchError( error => of(fromActions.cargarUsuarioFail({ payload: error })))
          );
      })
    ),
    // { dispatch: false }
  );
}
