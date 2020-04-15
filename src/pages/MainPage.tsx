import React, { ReactElement, useState, useEffect } from 'react'
import TwMap from 'components/twmap/TwMap';
import SearchInput from 'components/searchfield/SearchInput';
import SearchList from 'components/searchfield/SearchList';
import SelectedList from 'components/selectedfield/SelectedList';
import Button from '@material-ui/core/Button';
import Counter from 'components/counter/Counter';
import './mainpage.scss';
interface Props {

}

export default function MainPage({ }: Props): ReactElement {
    const [searchResult, setSearchResult] = useState<Object[]>([]);
    const [clickedIndex, setClickedIndex] = useState<number>(-1);
    const [selected, setSelected] = useState<number[]>([]);
    const [selectedList, setSelectedList] = useState<Object[]>([]);

    useEffect(() => {
        setClickedIndex(-1);
    }, [searchResult]);
    const handleButtonClick = () => {
        let selectedList = [] as Object[];
        searchResult.forEach((element, index) => {
            if (selected.indexOf(index) !== -1) {
                selectedList.push(element);
            }
        })
        setSelectedList(selectedList);
    }
    return (
        <div>
            <TwMap searchResult={searchResult} clickedIndex={clickedIndex} setClickedIndex={setClickedIndex} />
            <SearchInput id="search-field" setSearchResult={setSearchResult} />
            <SearchList id='search-list'
                searchResult={searchResult}
                clickedIndex={clickedIndex}
                setClickedIndex={setClickedIndex}
                selected={selected}
                setSelected={setSelected} />
            <Button id="search-select-button" variant="contained" onClick={handleButtonClick}>선택<span role="img" aria-label="arrow">🔻</span></Button>
            <SelectedList id='selected-list' selectedList={selectedList} />
            {/* <Counter></Counter> */}
        </div>
    )
}
