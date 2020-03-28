import React, { useEffect, useRef, useState, useContext } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Feature from "react-mapbox-gl/lib-esm/feature";
import Layer from "react-mapbox-gl/lib-esm/layer";
import AppContext from '../AppContext';
import {isEmpty} from 'lodash';
import MapboxGeocoder from 'mapbox-gl-geocoder';
import Geocode from "react-geocode";

const styles = {
    width: "100vw",
    height: "100vw",
    position: "absolute"
};

const MapboxGLMap = () => {
    const {state} = useContext(AppContext);
    const [map, setMap] = useState(null);
    const [circleRadius, setCircleRadius] = useState(30);
    const [routeIndex, setRouteIndex] = useState(0);
    const [zoom, setZoom] = useState(8);
    const mapContainer = useRef(null);

    mapboxgl.accessToken = 'pk.eyJ1Ijoiem9lbmthdHoiLCJhIjoiY2s3cmMzeDlvMDNnaDNlcGdpcDJxYTYxcyJ9.Wc97-chR3WRSOdDbM0PTNg';

    const initializeMap = ({ setMap, mapContainer}) => {
        setMap(new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
            center: state.center,
            zoom: zoom
        }));
    };

    const lineLayout = {
        'line-cap': 'round',
        'line-join': 'round'
    };

    const linePaint = {
        'line-color': '#4790E5',
        'line-width': 12
    };

    const polygonPaint = {
        'fill-color': '#6F788A',
        'fill-opacity': 0.7
    };



    const getCirclePaint = () => ({
        'circle-radius': circleRadius,
        'circle-color': '#000',
        'circle-opacity': 0.8
    });

    useEffect(() => {
        if(map) {
            map.resize();
        }
    }, [map]);

    useEffect(() => {
        console.log(state, "state");
        initializeMap({ setMap, mapContainer });
    }, [state.center, zoom]);

    return <div ref={el => (mapContainer.current = el)} style={styles} >
        {/* Line example */}
        {/*<Layer type="line" layout={lineLayout} paint={linePaint}>*/}
        {/*    <Feature coordinates={[-0.120736, 51.5118219]} />*/}
        {/*</Layer>*/}

        {/*/!* Circle example *!/*/}
        {/*<Layer type="circle" paint={getCirclePaint()}>*/}
        {/*    <Feature coordinates={[-0.120736, 51.5118219]} />*/}
        {/*</Layer>*/}

    </div>
};

export default MapboxGLMap;
