import React, { useEffect, useRef, useState, useContext, useCallback } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import AppContext from '../AppContext';
import MapboxDraw from 'mapbox-gl-draw';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import DrawControl from "react-mapbox-gl-draw";
import {isEmpty} from 'lodash';
import MapboxGeocoder from 'mapbox-gl-geocoder';
import turf from '@turf/turf'
import Geocode from "react-geocode";

const styles = {
    width: "100vw",
    height: "100vw",
    position: "absolute"
};

const MapboxGLMap = () => {
    const {state} = useContext(AppContext);
    const [map, setMap] = useState(null);
    const [mapDraw, setMapDraw] = useState(null);
    const [circleRadius, setCircleRadius] = useState(30);
    const [routeIndex, setRouteIndex] = useState(0);
    const [coordinates, setCoordinates] = useState([]);
    const [zoom, setZoom] = useState(8);
    const mapContainer = useRef(null);
    const drawControl = useRef(null);

    useEffect(() => {
        if(drawControl.current) {
            console.log(drawControl.current.draw);
        }
    }, [drawControl.current]);

    mapboxgl.accessToken = 'pk.eyJ1Ijoiem9lbmthdHoiLCJhIjoiY2s3cmMzeDlvMDNnaDNlcGdpcDJxYTYxcyJ9.Wc97-chR3WRSOdDbM0PTNg';


    const Mapbox = ReactMapboxGl({
        minZoom: 8,
        maxZoom: 15,
        accessToken: mapboxgl.accessToken
    });

    const initializeMap = useCallback(({ setMap, mapContainer}) => {
        // setMap(new mapboxgl.Map({
        //     container: mapContainer.current,
        //     style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
        //     center: state.center,
        //     zoom: zoom
        // }));

    }, [state.center, zoom, mapContainer.current, state.isDrawPolygon]);


    useEffect(() => {
        setMapDraw(new MapboxDraw({
            displayControlsDefault: false,
            controls: {
                polygon: state.isDrawPolygon,
                trash: true
            }
        }));

    }, [state.isDrawLine, state.isDrawPoint, state.isDrawPolygon]);


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
        if(map && mapDraw){
            map.addControl(mapDraw);
        }
    }, [map, mapDraw]);

    useEffect(() => {
        console.log(state, "state");
        initializeMap({ setMap, mapContainer });
    }, [state.center, zoom]);

    const onDrawCreate = async (e) => {
        const cords = e.features[0].geometry.coordinates.join(';')
        const url = `https://api.mapbox.com/directions/v5/mapbox/cycling/${cords}?geometries=geojson&steps=true&&access_token=${mapboxgl.accessToken}`;
        let res = await fetch(url)
        let response = await res.json();

        setCoordinates(response.routes[0].geometry.coordinates)
    };

    const onDrawUpdate = ({ features }) => {
        console.log(features);
    };
    const onDrawDelete = ({ features }) => {
        console.log(features);
    };
    const onDrawRender = ({features}) => {
        console.log(features, "features");
    };

    return <Mapbox ref={mapContainer} containerStyle={{height: "100vh", width: "100vw"}} zoom={[zoom]}
                   center={state.center} style="mapbox://styles/mapbox/streets-v11">
        <DrawControl
            ref={drawControl}
            displayControlsDefault={false}
            controls={{point: true, line_string:true, polygon: true}}
            onDrawCreate={onDrawCreate}
            onDrawUpdate={onDrawUpdate}
            onDrawDelete={onDrawDelete}
            onDrawRender={onDrawRender}
        />
        <Layer
            type="line"
            id="power"
            layout={{
                "line-join": "round",
                "line-cap": "round"
            }}
            paint={{
                "line-color": "#3b9ddd",
                "line-width": 8,
                "line-opacity": 0.8
            }}
        >
            <Feature coordinates={coordinates} />
        </Layer>
    </Mapbox>
};

export default MapboxGLMap;
