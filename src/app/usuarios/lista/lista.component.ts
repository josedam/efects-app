import { Component, OnInit, OnDestroy } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { cargarUsuarios } from '../../store/actions/usuarios.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styles: []
})
export class ListaComponent implements OnInit, OnDestroy {
  usuarios: Usuario[] = [];
  loading: boolean;
  error: any;

  private storeSubscription: Subscription = new Subscription();

  constructor( private store: Store<AppState>) { }

  ngOnInit() {
    this.storeSubscription = this.store.select('usuarios')
      .subscribe( usersState => {
         this.usuarios = usersState.users;
         this.loading = usersState.loading;
         this.error = usersState.error;
      });

    this.store.dispatch(cargarUsuarios());
  }

  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
  }
}
