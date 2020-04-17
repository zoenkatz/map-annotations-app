import React, {useEffect, useState, useContext} from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import AppContext from '../AppContext';
import MapboxDraw from 'mapbox-gl-draw';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';

const MapboxGLMap = () => {
    const {state, dispatch} = useContext(AppContext);
    const [map, setMap] = useState(null);
    const [mapDraw, setMapDraw] = useState(null);

    useEffect(() => {
        if (map) {
            map.flyTo({
                center: state.center, essential: true, zoom: 9,
                bearing: 0, speed: 0.7
            });
        }
    }, [state.center]);

    mapboxgl.accessToken = 'pk.eyJ1Ijoiem9lbmthdHoiLCJhIjoiY2s3cmMzeDlvMDNnaDNlcGdpcDJxYTYxcyJ9.Wc97-chR3WRSOdDbM0PTNg';


    useEffect(() => {
        setMap(new mapboxgl.Map({
            minZoom: 8,
            maxZoom: 15,
            accessToken: mapboxgl.accessToken,
            container: 'map', // html element id in render
            style: 'mapbox://styles/mapbox/streets-v9',
            center: state.center, // note: lon comes before lat
            zoom: [8]
        }));
    }, []);

    useEffect(() => {
        mapboxgl.center = state.center;
    }, [state.center]);

    useEffect(() => {
        setMapDraw(new MapboxDraw({
            displayControlsDefault: false,
            controls: {
                polygon: true,
                point: true,
                line_string: true,
                trash: true
            }
        }));

    }, []);

    useEffect(() => {
        if (map && mapDraw && state.clickedRoute && state.clickedRoute.id) {
            const geometryType = state.clickedRoute.geometry.type;
            const geometryCoords = state.clickedRoute.geometry.coordinates;

            geometryType === 'LineString' ? map.flyTo({center: geometryCoords[0]}) :
                geometryType === 'Polygon' ? map.flyTo({center: geometryCoords[0][0]}) : map.flyTo({center: geometryCoords});
            mapDraw.changeMode('simple_select', {featureIds: [state.clickedRoute.id]})
        }
    }, [state.clickedRoute, mapDraw]);

    const onSelectFeature = ({features}) => {
        dispatch({type: 'SET_CLICKED_ROUTE', payload: {route: features[0]}});
    };

    const drawDelete = ({features}) => {
        dispatch({type: 'DELETE_MAP_ROUTE', payload: {route: features[0]}});
    };

    useEffect(() => {
        if (map) {
            map.resize();
            map.on('draw.create', drawCreate);
            map.on('draw.delete', drawDelete);
            map.on('draw.render', drawRender);
            map.on('draw.selectionchange', onSelectFeature)
        }
        if (map && mapDraw) {
            map.addControl(mapDraw);
        }
    }, [map, mapDraw]);

    const drawCreate = () => {
        const drawData = mapDraw.getAll();
        dispatch({type: 'SET_FEATURES', payload: {features: drawData.features}});

    };

    const drawRender = () => {
        const controlButtons = document.getElementsByClassName('mapboxgl-ctrl-group mapboxgl-ctrl');
        const actionButtons = document.getElementsByClassName('app-action-buttons');
        if (!!controlButtons.length && !!actionButtons.length) {
            controlButtons[0].style.display = 'flex';
            actionButtons[0].appendChild(controlButtons[0]);

        }
    };

    return <div id='map'/>
};

export default MapboxGLMap;
