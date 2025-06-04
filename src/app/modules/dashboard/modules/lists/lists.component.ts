import { Component, OnInit } from '@angular/core';
import { ListsActions } from './store/lists.actions';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { List } from './models';
import { selectLists, selectListsError, selectListsLoading } from './store/lists.selector';
import { AuthService } from '../../../../core/services/auth.service';
import { User } from '../../../../core/models';

@Component({
  selector: 'app-lists',
  standalone: false,
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.scss'
})
export class ListsComponent implements OnInit {

  lists$: Observable<List[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  authUser$: Observable<User | null>

  constructor(private store: Store, private authService: AuthService) {

    this.authUser$ = this.authService.authUser$;

    this.lists$ = this.store.select(selectLists);
    this.loading$ = this.store.select(selectListsLoading);
    this.error$ = this.store.select(selectListsError);
  }

  ngOnInit(): void {
    this.store.dispatch(ListsActions.loadLists())
  }


  newList = { userId: '', studentId: '' };


  onCreate() {
    this.store.dispatch(ListsActions.createList({ list: this.newList }));
    this.newList = { userId: '', studentId: '' }; // limpiar formulario
  }

  formList: List = { userId: '', studentId: '' };
  isEditing = false;


  onSubmit() {

    if (!this.formList.userId || !this.formList.studentId) {
      alert('El formulario está incompleto');
      return;
    }

    if (this.isEditing && this.formList.id !== undefined) {
      // Editar lista existente
      this.store.dispatch(ListsActions.editList({ list: this.formList }));
    } else {
      // Crear nueva lista
      this.store.dispatch(ListsActions.createList({ list: this.formList }));
    }

    this.resetForm();
  }


  editList(list: List) {
    this.formList = { ...list }; // Carga la lista en el formulario
    this.isEditing = true;
  }


  cancelEdit() {
    this.resetForm();
  }


  resetForm() {
    this.formList = { userId: '', studentId: '' };
    this.isEditing = false;
  }

  onDelete(list: List): void {
    if (list.id !== undefined) {
      const confirmed = window.confirm('¿Estás seguro que querés eliminar el estudiante?')
      if (confirmed) {
        this.store.dispatch(ListsActions.deleteList({ id: list.id }));
      }
    } else {
      console.log('No se puede eliminar una lista sin ID');
    }
  }
}
