import axios from 'axios';

export const getTripRoute = async (locations: number[][]) => {
    let uri = 'https://router.project-osrm.org/trip/v1/driving/';
    locations.forEach((latLng: number[]) => {
        uri += `${latLng[0]},${latLng[1]};`;
    })
    uri = uri.substr(0, uri.length - 1);
    uri += '?geometries=geojson&source=first&destination=last&roundtrip=false';
    // 파라미터는 다음 주소를 참고
    // http://project-osrm.org/docs/v5.10.0/api/?language=JavaScript#trip-service
    const response = await axios.get(uri);
    return response.data;
}

export const getSearchResult = async (query: string) => {
    const uri = `https://nominatim.openstreetmap.org/search?format=geojson&addressdetails=1&extratags=1&namedetails=1&accept-language=ko-kr&q=${query}`;
    const response = await axios.get(uri);
    // console.log(response, response.data);
    return response.data;
}