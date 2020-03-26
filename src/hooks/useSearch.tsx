import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'modules';
import { searchLocation } from 'modules/search';
import { useCallback } from 'react';

export default function useSearch() {
    const searchResult = useSelector((state: RootState) => state.search.searchResult);
    const dispatch = useDispatch();

    const onSearch = useCallback((location: string) => dispatch(searchLocation(location)), [dispatch]);
    return {
        searchResult,
        onSearch
    };
}
