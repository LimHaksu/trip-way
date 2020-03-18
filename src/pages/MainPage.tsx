import React, { Component } from 'react'

import TwMap from 'components/twmap/TwMap';

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
            </div>
        )
    }
}