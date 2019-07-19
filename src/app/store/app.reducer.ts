import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromReducers from './reducers';

export interface AppState {
    usuarios: fromReducers.UsuariosState;
    usuario: fromReducers.UsuarioState;
}

export const appReducers: ActionReducerMap<AppState> = {
    usuarios: fromReducers.usuariosReducer,
    usuario: fromReducers.usuarioReducer
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
