import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import './twmap.scss';
import * as mapApi from 'lib/mapApi';
type Viewport = {
    center: L.LatLngTuple,
    zoom: number,
}
interface Props {

}
interface State {
    viewport: Viewport;
    lines: any;
    wayPoints: any[];
}

export default class TwMap extends Component<Props, State> {
    state = {
        viewport: {
            center: [37.497781, 126.994194] as L.LatLngTuple,
            zoom: 13
        },
        lines: {} as any,
        wayPoints: []
    }
    async componentDidMount() {
        // (Longitude , Latitude) 순서로 넣어줘야함
        const locations = [[126.961479, 37.477559], [126.987096, 37.493153], [127.015235, 37.488542], [127.032299, 37.506952]];
        // const locations = [[13.388860, 52.517037], [13.397634, 52.529407], [13.428555, 52.523219]];
        const data = await mapApi.getTripRoute(locations);
        // trips type : Array
        let wayPoints = data.waypoints.map((element: any) => {
            const temp = element.location[0];
            element.location[0] = element.location[1];
            element.location[1] = temp;
            return element;
        })
        this.setState({ lines: data.trips[0].geometry, wayPoints: wayPoints });
    }
    renderMarkers = (wayPoints: any[]) => {
        wayPoints.map((point: any, idx) =>
            <Marker key={`marker-${idx}`} position={point.location}>
            </Marker>
        )
    }
    render() {
        const viewport = this.state.viewport;
        const { lines, wayPoints } = this.state;
        return (
            <Map id='tw-map' viewport={viewport}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {typeof lines.coordinates != 'undefined' && <GeoJSON key='tw-geojson' data={lines} />}
                {/* {this.renderMarkers(wayPoints)} */}
                {wayPoints.map((point: any, idx) =>
                    <Marker key={`marker-${idx}`} position={point.location}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                )}
            </Map>
        )
    }
}
