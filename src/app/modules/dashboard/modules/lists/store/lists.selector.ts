import { createFeatureSelector, createSelector } from "@ngrx/store";
import { LISTS_FEATURE_KEY, ListsState } from "./lists.reducer";


export const selectListsState = createFeatureSelector<ListsState>(LISTS_FEATURE_KEY);

export const selectLists = createSelector(
    selectListsState,
    (state) => state.lists
);

export const selectListsLoading = createSelector(
    selectListsState,
    (state) => state.loading
);

export const selectListsError = createSelector(
    selectListsState,
    (state) => state.error
);