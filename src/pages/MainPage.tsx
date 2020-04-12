import React, { ReactElement, useState } from 'react'
import TwMap from 'components/twmap/TwMap';
import SearchInput from 'components/searchfield/SearchInput';
import SearchList from 'components/searchfield/SearchList';
import Counter from 'components/counter/Counter';
import './mainpage.scss';
interface Props {

}

export default function MainPage({ }: Props): ReactElement {
    const [searchResult, setSearchResult] = useState<Object[]>([]);
    // console.log(searchResult);
    return (
        <div>
            <TwMap />
            <SearchInput id="search-field" setSearchResult={setSearchResult} />
            <SearchList id='search-list' searchResult={searchResult} />
            {/* <Counter></Counter> */}
        </div>
    )
}
