import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { List } from "../models";

export const ListsActions = createActionGroup({
    source: "Lists",
    events: {
        "Load Lists": emptyProps(),       //Acciones sin argumentos, emptyProps
        "Load Lists Sucess": props<{ lists: List[] }>(),     //Acción satisfactoria
        "Load Lists Failure": props<{ error: string }>(),   //Acción de error     Reemplazar any[] por el valor real de los pedidos

        "Create List": props<{ list: List }>(),
        "Create List Sucess": props<{ list: List }>(),
        "Create List Failure": props<{ error: any }>(),

        "Edit List": props<{ list: List }>(),
        "Edit List Sucess": props<{ list: List }>(),
        "Edit List Failure": props<{ error: string }>(),

        "Delete List": props<{ id: number }>(),
        "Delete List Sucess": props<{ id: number }>(),
        "Delete List Failure": props<{ error: string }>(),

        "Load List By Id": props<{ id: string }>(),       //Acciones con argumentos, props
    },
});