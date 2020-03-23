import React, { Component } from 'react'
import TwMap from 'components/twmap/TwMap';
import SearchField from 'components/searchfield/SearchField';
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
                <SearchField id="search-field" />
            </div>
        )
    }
}