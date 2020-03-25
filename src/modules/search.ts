import { ActionAccessibility } from "material-ui/svg-icons";

const SEARCH_LOCATION = 'search/SEARCH_LOCATION' as const;

export const searchLocation = (location : string) => ({ 
    type : SEARCH_LOCATION, 
    payload : location
});

type SearchAction =
    | ReturnType<typeof searchLocation>

type SearchState = {
    searchResult : [];
}

const initialState : SearchState = {
    searchResult : []
}

const search = (state = initialState, action : any) => {
    switch(action.type){
        case SEARCH_LOCATION:
            return { searchResult : action.payload };
        default:
            return state;
    }
};

export default search;