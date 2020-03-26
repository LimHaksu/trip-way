import { createAction, ActionType, createReducer } from 'typesafe-actions';
import * as mapApi from 'lib/mapApi';

const SEARCH_LOCATION = 'search/SEARCH_LOCATION';

export const searchLocation = createAction(
    SEARCH_LOCATION,
    (location: string) => (mapApi.getSearchResult(location)))();

const actions = { searchLocation };
type SearchAction = ActionType<typeof actions>;

type SearchState = {
    searchResult: Promise<any>;
}

const initialState: SearchState = {
    searchResult: {} as Promise<any>
}

const search = createReducer<SearchState, SearchAction>(initialState, {
    [SEARCH_LOCATION]: (state, action) => ({ searchResult: action.payload })
})

export default search;