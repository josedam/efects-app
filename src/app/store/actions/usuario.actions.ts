import { createAction, props } from '@ngrx/store';
import { Usuario } from '../../models/usuario.model';

export const cargarUsuario = createAction('[Usuario] Cargar Usuario',
                    props<{id: string}>());

export const cargarUsuarioFail = createAction('[Usuario] Cargar Usuario Fail', 
                    props<{payload: any}>());

export const cargarUsuarioSuccess = createAction('[Usuario] Cargar Usuario Success',
                    props<{usuario: Usuario}>());
