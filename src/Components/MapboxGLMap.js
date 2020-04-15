import React, { useEffect, useRef, useState, useContext } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import AppContext from '../AppContext';
import MapboxDraw from 'mapbox-gl-draw';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';

const styles = {
    width: "100vw",
    height: "100vw",
    position: "absolute"
};

const MapboxGLMap = () => {
    const {state, dispatch} = useContext(AppContext);
    const [map, setMap] = useState(null);
    const [mapDraw, setMapDraw] = useState(null);
    const [circleRadius] = useState(10);
   // const [zoom, setZoom] = useState(8);

    useEffect(() => {
        if(map) {
            map.flyTo({center: state.center});
        }
    }, [state.center, map]);

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
    },[]);

    useEffect(() => {
        mapboxgl.center = state.center;
    }, [state.center]);


    const lineLayout = {
        'line-cap': 'round',
        'line-join': 'round'
    };

    const linePaint = {
        'line-color': '#4790E5',
        'line-width': 5,
        'line-opacity': 0.8
    };

    const polygonPaint = {
        'fill-color': '#6F788A',
        'fill-opacity': 0.7
    };

    const circlePaint = {
        'circle-radius': circleRadius,
        'circle-color': '#000',
        'circle-opacity': 0.8
    };

    const clickedLinePaint = {
        ...linePaint,
        'line-color': '#dc46d0'
    };

    const clickedPolygonPaint = {
        ...polygonPaint,
        'fill-color': '#dc46d0'
    };


    const clickedCirclePaint = {
        ...circlePaint,
        'circle-color': '#dc46d0'
    };

    useEffect(() => {
        setMapDraw(new MapboxDraw({
            displayControlsDefault: false,
            controls: {
                polygon: true,
                point: true,
                line_string: true,
                trash: true
            },
            styles: [
            // ACTIVE (being drawn)
            // line stroke
            {
                "id": "gl-draw-line",
                "type": "line",
                "active": 'false',
                "layout": lineLayout,
                "paint": linePaint
            },
            // polygon fill
            {
                "id": "gl-draw-polygon",
                "type": "fill",
                "active": 'false',
                "paint": polygonPaint
            },
            // vertex point halos
            {
                "id": "gl-draw-circle",
                "type": "circle",
                "active": 'false',
                "paint": circlePaint
            },

            // INACTIVE (static, already drawn)
            // line stroke
            {
                "id": "gl-draw-line-active",
                "type": "line",
                "active": 'true',
                "layout":lineLayout,
                "paint": clickedLinePaint
            },
            // polygon fill
            {
                "id": "gl-draw-polygon-active",
                "type": "fill",
                "active": 'true',
                "paint": clickedPolygonPaint
            },
            // circle outline
                {
                    "id": "gl-draw-circle-active",
                    "type": "circle",
                    "active": 'true',
                    "paint": clickedCirclePaint
                }
        ]
        }));

    }, []);

    useEffect(() => {
        if(mapDraw && state.clickedRoute) {
            mapDraw.setFeatureProperty(state.clickedRoute.id, 'active', 'true');
        }
    }, [state.clickedRoute]);

    const onSelectFeature = ({features}) => {
        dispatch({type: 'SET_CLICKED_ROUTE', payload: {route: features[0]}})
    };

    useEffect(() => {
        if(map) {
            map.resize();
            map.on('draw.create', drawCreate);
            map.on('draw.render', drawRender);
            map.on('draw.selectionchange', onSelectFeature)
        }
        if(map && mapDraw){
            map.addControl(mapDraw);
        }
    }, [map, mapDraw]);

    // useEffect(() => {
    //     console.log(state, "state");
    //    // initializeMap({ setMap, mapContainer });
    // }, [state.center, zoom]);

    const drawCreate = () => {
        const drawData = mapDraw.getAll();
        dispatch({type: 'SET_FEATURES', payload: {features: drawData.features} });
    };

    const drawRender = () => {
        const controlButtons = document.getElementsByClassName('mapboxgl-ctrl-group mapboxgl-ctrl');
        const actionButtons = document.getElementsByClassName('app-action-buttons');
        if(!!controlButtons.length && !!actionButtons.length) {
            controlButtons[0].style.display = 'flex';
            actionButtons[0].appendChild(controlButtons[0]);

        }
    };

    return <div id='map' />
};

export default MapboxGLMap;
