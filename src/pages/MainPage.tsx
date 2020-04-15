import React, { ReactElement, useState, useEffect } from 'react'
import TwMap from 'components/twmap/TwMap';
import SearchInput from 'components/searchfield/SearchInput';
import SearchList from 'components/searchfield/SearchList';
import TripPlaceList from 'components/selectedfield/TripPlaceList';
import Button from '@material-ui/core/Button';
import Counter from 'components/counter/Counter';
import './mainpage.scss';
interface Props {

}

export default function MainPage({ }: Props): ReactElement {
    const [searchResult, setSearchResult] = useState<Object[]>([]);
    const [clickedIndex, setClickedIndex] = useState<number>(-1);
    const [searchSelected, setSearchSelected] = useState<number[]>([]);
    const [tripPlaceList, setTripPlaceList] = useState<Object[]>([]);
    const [tripPlaceSelected, settripPlaceSelected] = useState<number[]>([]);
    const [tpClickedIndex, setTpClickedIndex] = useState<number>(-1);
    useEffect(() => {
        setClickedIndex(-1);
    }, [searchResult]);
    const handleButtonClick = () => {
        let selectedList = [] as Object[];
        searchResult.forEach((element, index) => {
            if (searchSelected.indexOf(index) !== -1) {
                selectedList.push(element);
            }
        })
        setTripPlaceList(selectedList);
    }
    return (
        <div>
            <TwMap
                searchResult={searchResult}
                clickedIndex={clickedIndex}
                setClickedIndex={setClickedIndex} />
            <SearchInput id="search-field" setSearchResult={setSearchResult} />
            <SearchList id='search-list'
                searchResult={searchResult}
                clickedIndex={clickedIndex}
                setClickedIndex={setClickedIndex}
                selected={searchSelected}
                setSelected={setSearchSelected} />
            <Button id="search-select-button" variant="contained" onClick={handleButtonClick}>선택<span role="img" aria-label="arrow">🔻</span></Button>
            <TripPlaceList id='trip-place-list'
                tripPlaceList={tripPlaceList}
                selected={tripPlaceSelected}
                setSelected={settripPlaceSelected}
                clickedIndex={tpClickedIndex}
                setClickedIndex={setTpClickedIndex} />
            {/* <Counter></Counter> */}
        </div>
    )
}
