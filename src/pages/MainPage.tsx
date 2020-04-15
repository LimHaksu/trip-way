import React, { ReactElement, useState, useEffect } from 'react'
import TwMap from 'components/twmap/TwMap';
import SearchInput from 'components/searchfield/SearchInput';
import SearchList from 'components/searchfield/SearchList';
import TripPlaceList from 'components/selectedfield/TripPlaceList';
import Button from '@material-ui/core/Button';
import Counter from 'components/counter/Counter';
import * as mapApi from 'lib/mapApi';
import './mainpage.scss';
interface Props {

}

export default function MainPage({ }: Props): ReactElement {
    const [searchResult, setSearchResult] = useState<Object[]>([]);
    const [clickedIndex, setClickedIndex] = useState<number>(-1);
    const [searchSelected, setSearchSelected] = useState<number[]>([]);
    const [tripPlaceList, setTripPlaceList] = useState<any[]>([]);
    const [tripPlaceSelected, settripPlaceSelected] = useState<number[]>([]);
    const [tpClickedIndex, setTpClickedIndex] = useState<number>(-1);
    const [lines, setLines] = useState({} as any);

    useEffect(() => {
        setClickedIndex(-1);
        setSearchSelected([]);
    }, [searchResult]);
    const handleButtonClick = () => {
        let selectedList = [] as Object[];
        tripPlaceList.forEach(element => {
            selectedList.push(element);
        });
        searchResult.forEach((element, index) => {
            if (searchSelected.indexOf(index) !== -1) {
                selectedList.push(element);
            }
        })
        setTripPlaceList(selectedList);
        setSearchSelected([]);
    }
    const handleRemoveButtonClick = () => {
        let newList = [] as Object[];
        tripPlaceList.forEach((element, index) => {
            if (tripPlaceSelected.indexOf(index) === -1) {
                newList.push(element);
            }
        })
        setTripPlaceList(newList);
        settripPlaceSelected([]);
    }
    const handleDrawPath = () => {
        // (Longitude, Latitude) 순서로 넣어줘야함
        // const locations = [[126.961479, 37.477559], [126.987096, 37.493153], [127.015235, 37.488542], [127.032299, 37.506952]];
        let locations: number[][] = [];
        tripPlaceList.forEach(place => {
            locations.push(place.geometry.coordinates);
        })
        drawPath(locations);
    }
    const drawPath = async (locations: number[][]) => {
        const data = await mapApi.getTripRoute(locations);
        let wayPoints = data.waypoints.map((element: any) => {
            // osrm 리턴 값은 (lng, lat) 튜플인데 leaflet에서 표기할땐 (lat, lng) 튜플이므로 순서를 바꿔줌
            const temp = element.location[0];
            element.location[0] = element.location[1];
            element.location[1] = temp;
            return element;
        })
        // trips type : Array
        console.log("다시계산");
        setLines(data.trips[0].geometry);
        // setWayPoints(wayPoints);
    }

    return (
        <div>
            <TwMap
                searchResult={searchResult}
                placeList={tripPlaceList}
                lines={lines}
                clickedIndex={clickedIndex}
                tpClickedIndex={tpClickedIndex} />
            <SearchInput id="search-field" setSearchResult={setSearchResult} />
            <SearchList id='search-list'
                searchResult={searchResult}
                clickedIndex={clickedIndex}
                setClickedIndex={setClickedIndex}
                selected={searchSelected}
                setSelected={setSearchSelected} />
            <Button id="search-select-button" variant="contained" onClick={handleButtonClick}><span role="img" aria-label="▼">🔻</span>선택</Button>
            <TripPlaceList id='trip-place-list'
                tripPlaceList={tripPlaceList}
                selected={tripPlaceSelected}
                setSelected={settripPlaceSelected}
                clickedIndex={tpClickedIndex}
                setClickedIndex={setTpClickedIndex} />
            <Button id="tp-remove-button" variant="contained" onClick={handleRemoveButtonClick}><span role="img" aria-label="x">❌</span>삭제</Button>
            <Button id="tp-path-button" variant="contained" onClick={handleDrawPath}><span role="img" aria-label="">🚗</span>경로찾기</Button>
            {/* <Counter></Counter> */}
        </div>
    )
}
