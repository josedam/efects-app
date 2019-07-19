
import * as fromActions from '../actions';
import { Usuario } from '../../models/usuario.model';
import { createReducer, on, Action } from '@ngrx/store';

export interface UsuarioState {
    user: Usuario;
    loaded: boolean;
    loading: boolean;
    error: any;
}

const initialState: UsuarioState = {
    user: null,
    loaded: false,
    loading: false,
    error: null,
};

const Reducer = createReducer(
    initialState,
    on(fromActions.cargarUsuario, (state, { id }) => {
           return { ...state, loading: true };
        }),
    on(fromActions.cargarUsuarioSuccess, (state, { usuario }) => {
        return { ...state,
                loading: false,
                loaded: true,
                user: {...usuario},
                error: null };
    }),
    on(fromActions.cargarUsuarioFail, (state, { payload }) => {
        return { ...state,
                loading: false,
                loaded: false,
                error: {
                    status: payload.status,
                    message: payload.message,
                    url: payload.url,
                    ok: payload.ok
                } };
    })
);

export function usuarioReducer(state: UsuarioState | undefined, action: Action) {
    return Reducer(state, action);
}

