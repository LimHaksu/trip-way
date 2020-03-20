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
        const data = await mapApi.getTripRoute(locations);
        let wayPoints = data.waypoints.map((element: any) => {
            // osrm 리턴 값은 (lng, lat) 튜플인데 leaflet에서 표기할땐 (lat, lng) 튜플이므로 순서를 바꿔줌
            const temp = element.location[0];
            element.location[0] = element.location[1];
            element.location[1] = temp;
            return element;
        })
        // trips type : Array
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
                    // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    url='http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}'
                    subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
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
