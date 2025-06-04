import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ListsActions } from "./lists.actions";
import { catchError, concatMap, map, of } from "rxjs";
import { ListsService } from "../lists.service";

@Injectable()
export class ListsEffects {
    loadLists$;
    createLists$;
    editList$;
    deleteList$;

    constructor(private actions$: Actions, private listService: ListsService) {

        console.log('Cargando listas');
        this.loadLists$ = createEffect(() => {
            return this.actions$.pipe(
                ofType(ListsActions.loadLists),
                concatMap(() =>
                    this.listService.getLists().pipe(
                        map(lists => ListsActions.loadListsSucess({ lists })),
                        catchError(error =>
                            of(ListsActions.loadListsFailure({ error: error.message }))
                        )
                    )
                )
            )
        });

        console.log('Creando nueva lista');
        this.createLists$ = createEffect(() => {
            return this.actions$.pipe(
                ofType(ListsActions.createList),
                concatMap(({ list }) =>
                    this.listService.createList(list).pipe(
                        map(createdList => ListsActions.createListSucess({ list: createdList })),
                        catchError(error =>
                            of(ListsActions.createListFailure({ error: error.message }))
                        )
                    )
                )
            )
        });

        console.log('Editando lista');
        this.editList$ = createEffect(() => {
            return this.actions$.pipe(
                ofType(ListsActions.editList),
                concatMap(({ list }) =>
                    this.listService.editList(list).pipe(
                        map(editedList =>
                            ListsActions.editListSucess({ list: editedList })
                        ),
                        catchError(error =>
                            of(ListsActions.editListFailure({ error: error.message }))
                        )
                    )
                )
            );
        });

        console.log('Eliminando lista');
        this.deleteList$ = createEffect(() => {
            return this.actions$.pipe(
                ofType(ListsActions.deleteList),
                concatMap(({ id }) =>
                    this.listService.deleteList(id).pipe(
                        map(() => ListsActions.deleteListSucess({ id })),
                        catchError(error =>
                            of(ListsActions.deleteListFailure({ error: error.message }))
                        )
                    )
                )
            );
        });


    }
}