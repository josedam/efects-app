

import * as fromActions from '../actions';
import { Usuario } from '../../models/usuario.model';
import { createReducer, on, Action } from '@ngrx/store';

export interface UsuariosState {
    users: Usuario[];
    loaded: boolean;
    loading: boolean;
    error: any;
}

const initialState: UsuariosState = {
    users: [],
    loaded: false,
    loading: false,
    error: null,
};

const Reducer = createReducer(
    initialState,
    on(fromActions.cargarUsuarios, state => ({ ...state, loading: true })),
    on(fromActions.cargarUsuariosSuccess, (state, { usuarios }) => {
        return { ...state,
                loading: false,
                loaded: true,
                users: [...usuarios],
                error: null };
    }),
    on(fromActions.cargarUsuariosFail, (state, { payload}) => {
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

export function usuariosReducer(state: UsuariosState | undefined, action: Action) {
    return Reducer(state, action);
}


