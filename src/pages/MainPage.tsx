import React, { Component } from 'react'
import TwMap from 'components/twmap/TwMap';
import SearchInput from 'components/searchfield/SearchInput';
import SearchList from 'components/searchfield/SearchList';
import './mainpage.scss';
interface Props {

}
interface State {

}

export default class MainPage extends Component<Props, State> {
    state = {}
    render() {
        return (
            <div>
                <TwMap />
                <SearchInput id="search-field" />
                <SearchList id='search-list' />
            </div>
        )
    }
}