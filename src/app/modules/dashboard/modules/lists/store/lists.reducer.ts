import { createFeature, createReducer, on } from "@ngrx/store";
import { ListsActions } from "./lists.actions";
import { List } from "../models";


export const LISTS_FEATURE_KEY = 'lists';


export interface ListsState {
    lists: List[];
    loading: boolean;
    error: string | null;
}

const initialState: ListsState = {
    lists: [],
    loading: false,
    error: null,
};


//Cargar listas

const listsReducer = createReducer(
    initialState,
    on(ListsActions.loadLists, (state) => {
        return {
            ...state,
            loading: true,
            error: null,
        }
    }),

    on(ListsActions.loadListsSucess, (state, action) => {
        return {
            ...state,
            lists: action.lists,
            loading: false,
            error: null,
        }
    }),

    on(ListsActions.loadListsFailure, (state, action) => {
        return {
            ...state,
            loading: false,
            lists: [],
            error: action.error,
        }
    }),


    //Crear lista

    on(ListsActions.createList, (state) => ({
        ...state,
        loading: true,
        error: null,
    })),

    on(ListsActions.createListSucess, (state, { list }) => ({
        ...state,
        lists: [...state.lists, list],
        loading: false,
    })),


    on(ListsActions.createListFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),


    // Editar lista
    on(ListsActions.editList, (state) => ({
        ...state,
        loading: true,
        error: null,
    })),

    on(ListsActions.editListSucess, (state, { list }) => ({
        ...state,
        lists: state.lists.map((l) => (l.id === list.id ? list : l)),
        loading: false,
        error: null,
    })),

    on(ListsActions.editListFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),


    //Eliminar lista
    on(ListsActions.deleteListSucess, (state, { id }) => ({
        ...state,
        lists: state.lists.filter(list => list.id !== id),
        loading: false,
        error: null
    })),

    on(ListsActions.deleteListFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),


);

export const listsFeature = createFeature({
    name: LISTS_FEATURE_KEY,
    reducer: listsReducer,
})