import React, { ReactElement, Fragment, useState, useEffect, createRef } from 'react'
import { Map, TileLayer, Marker, Popup, GeoJSON, LayersControl, Point } from 'react-leaflet';
import './twmap.scss';
import L from 'leaflet'
import { GeoJsonObject } from 'geojson';

const blueIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const redIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const greenIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const yellowIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

type Viewport = {
    center: L.LatLngTuple,
    zoom: number,
}
interface Props {
    searchResult: any[];
    placeList: any[];
    clickedIndex: number;
    setClickedIndex: React.Dispatch<React.SetStateAction<number>>;
    lines: any;
}
interface State {
    viewport: Viewport;
    lines: any;
    wayPoints: any[];
}



export default function TwMap({ searchResult, placeList, lines, clickedIndex, setClickedIndex }: Props): ReactElement {
    const [searchLocations, setSearchLocations] = useState<Object[]>([]);
    const [viewport, setViewport] = useState({ center: [37.497781, 126.994194] as L.LatLngTuple, zoom: 13 });
    const [wayPoints, setWayPoints] = useState([]);
    useEffect(() => {
        if (searchResult.length > 0) {
            const zoom = 13;
            const lat = searchResult[0].geometry.coordinates[1];
            const lng = searchResult[0].geometry.coordinates[0];
            setViewport({ zoom: zoom, center: [lat, lng] });
        }
        return () => {
            // clean up
        }
    }, [searchResult]);
    useEffect(() => {
        if (searchResult.length > 0) {
            const idx = clickedIndex >= 0 ? clickedIndex : 0;
            const lat = searchResult[idx].geometry.coordinates[1];
            const lng = searchResult[idx].geometry.coordinates[0];
            setViewport({ zoom: viewport.zoom, center: [lat, lng] });
        }
        return () => {
            // clean up
        }
    }, [clickedIndex]);

    const renderMarkers = (wayPoints: any[]) => {
        wayPoints.map((point: any, idx) =>
            <Marker key={`marker-${idx}`} position={point.location}>
            </Marker>
        )
    }

    const handleMarkerClick = () => {
        console.log("클릭");
    }
    // const refmarker = createRef<Marker>();
    // const updatePosition = () => {
    //     const marker = refmarker.current
    //     if (marker != null) {
    //         console.log(marker.leafletElement.getLatLng());
    //     }
    // }
    const handleZoom = (e: any) => {
        setViewport({ center: [e.target._lastCenter.lat, e.target._lastCenter.lng], zoom: e._zoom });
    }
    const getLinesHash = (lines: any) => {
        let hash = 0;
        console.log(lines);
        lines.coordinates.forEach((element: any) => {
            hash += element[0] + element[1];
        })
        return hash;
    }
    return (
        <div>
            {console.log(lines)}
            <Fragment>
                <Map id='tw-map' viewport={viewport} onzoomend={handleZoom}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        url='http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}' // lyrs= m : normal map, s : Satellite, h : hybrid, p : Terrain
                        subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
                    />
                    {typeof lines.coordinates != 'undefined' && <GeoJSON key={getLinesHash(lines)} data={lines} />}
                    {/* {this.renderMarkers(wayPoints)} */}
                    {wayPoints.map((point: any, idx) =>
                        <Marker key={`marker-${idx}`} position={point.location}>
                            <Popup>
                                A pretty CSS3 popup. <br /> Easily customizable.
                            </Popup>
                        </Marker>
                    )}
                    {searchResult.map((element, idx) => {
                        if (idx === clickedIndex) {
                            return <Marker key={`search-marker-${idx}`}
                                position={[element.geometry.coordinates[1], element.geometry.coordinates[0]]}
                                icon={redIcon}
                                zIndexOffset={1000}
                                riseOnHover
                            >
                            </Marker>
                        } else {
                            return <Marker key={`search-marker-${idx}`}
                                position={[element.geometry.coordinates[1], element.geometry.coordinates[0]]}
                                icon={blueIcon}
                                zIndexOffset={0}
                                riseOnHover>
                            </Marker>
                        }
                    })}
                    {placeList.map((element, idx) => {
                        if (idx === clickedIndex) {
                            return <Marker key={`place-marker-${idx}`}
                                position={[element.geometry.coordinates[1], element.geometry.coordinates[0]]}
                                icon={yellowIcon}
                                zIndexOffset={1000}
                                riseOnHover
                            >
                            </Marker>
                        } else {
                            return <Marker key={`place-marker-${idx}`}
                                position={[element.geometry.coordinates[1], element.geometry.coordinates[0]]}
                                icon={greenIcon}
                                zIndexOffset={0}
                                riseOnHover>
                            </Marker>
                        }
                    })}
                </Map>
                <img id="google-logo" src={require("images/google_logo.png")} alt="powered by google" />
            </Fragment>
        </div >
    )
}

// export default class TwMap extends Component<Props, State> {
//     state = {
//         viewport: {
//             center: [37.497781, 126.994194] as L.LatLngTuple,
//             zoom: 13
//         },
//         lines: {} as any,
//         wayPoints: []
//     }

//     async componentDidMount() {

//     }

//     render() {
//         const viewport = this.state.viewport;
//         const { lines, wayPoints } = this.state;
//         return (

//         )
//     }
// }
