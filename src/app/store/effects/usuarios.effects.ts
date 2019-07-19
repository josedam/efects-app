import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as fromActions from '../actions';
import { UsuarioService } from '../../services/usuario.service';
import { of } from 'rxjs';

@Injectable()
export class UsuariosEffects {
  constructor(
        private actions$: Actions,
        private usuarioService: UsuarioService
        ) {}

  cargarUsuarios$ = createEffect(() => this.actions$.pipe(
      ofType(fromActions.cargarUsuarios),
      switchMap( () => {
        return this.usuarioService.getUsers()
          .pipe(
            map(users => fromActions.cargarUsuariosSuccess({ usuarios: users })),
            catchError( error => of(fromActions.cargarUsuariosFail({ payload: error })))
          );
      })
    ),
    // { dispatch: false }
  );
}
