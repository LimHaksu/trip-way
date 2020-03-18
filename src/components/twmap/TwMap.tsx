import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import './twmap.scss';
type Viewport = {
    center: L.LatLngTuple,
    zoom: number,
}
interface Props {

}
interface State {
    viewport: Viewport;
}

export default class TwMap extends Component<Props, State> {
    state = {
        viewport: {
            center: [37.541052, 126.986172] as L.LatLngTuple,
            zoom: 13
        }
    }
    render() {
        const viewport = this.state.viewport;
        return (
            <Map id='tw-map' viewport={viewport}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={viewport.center}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                </Marker>
            </Map>
        )
    }
}
