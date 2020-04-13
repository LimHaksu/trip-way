import React, { ReactElement, useState, useEffect } from 'react'
import TwMap from 'components/twmap/TwMap';
import SearchInput from 'components/searchfield/SearchInput';
import SearchList from 'components/searchfield/SearchList';
import SelectedList from 'components/selectedfield/SelectedList';
import Counter from 'components/counter/Counter';
import './mainpage.scss';
interface Props {

}

export default function MainPage({ }: Props): ReactElement {
    const [searchResult, setSearchResult] = useState<Object[]>([]);
    const [clickedIndex, setClickedIndex] = useState<number>(-1);

    useEffect(() => {
        setClickedIndex(-1);
    }, [searchResult]);
    return (
        <div>
            <TwMap searchResult={searchResult} clickedIndex={clickedIndex} setClickedIndex={setClickedIndex} />
            <SearchInput id="search-field" setSearchResult={setSearchResult} />
            <SearchList id='search-list' searchResult={searchResult} clickedIndex={clickedIndex} setClickedIndex={setClickedIndex} />
            <SelectedList id='selected-list' />
            {/* <Counter></Counter> */}
        </div>
    )
}
