import React, { useEffect, useRef, useState, useContext, useCallback } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import AppContext from '../AppContext';
import MapboxDraw from 'mapbox-gl-draw';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import DrawControl from "react-mapbox-gl-draw";
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
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
    const {state, dispatch} = useContext(AppContext);
    const [map, setMap] = useState(null);
    const [mapDraw, setMapDraw] = useState(null);
    const [circleRadius, setCircleRadius] = useState(30);
    const [zoom, setZoom] = useState(8);
    const mapContainer = useRef(null);
    const drawControl = useRef(null);

    // const setChosenRoute = useCallback((clickedRoute) => {
    //     dispatch({type: 'SET_CLICKED_ROUTE', payload: {route: {clickedRoute}}})
    // }, [dispatch]);


    useEffect(() => {
        if(drawControl) {
            console.log(drawControl);
            dispatch({type: 'SET_DRAW_CONTROL_REF', payload: {drawControlRef : drawControl}});
        }
     }, [drawControl]);

    mapboxgl.accessToken = 'pk.eyJ1Ijoiem9lbmthdHoiLCJhIjoiY2s3cmMzeDlvMDNnaDNlcGdpcDJxYTYxcyJ9.Wc97-chR3WRSOdDbM0PTNg';


    const Mapbox = ReactMapboxGl({
        minZoom: 8,
        maxZoom: 15,
        accessToken: mapboxgl.accessToken
    });

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
        'line-width': 12,
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
        'line-color': '#dc46d0',
        'line-width': 12,
        'line-opacity': 0.8
    };

    const clickedPolygonPaint = {
        'fill-color': '#dc46d0',
        'fill-opacity': 0.7
    };


    const clickedCirclePaint = {
        'circle-radius': circleRadius,
        'circle-color': '#dc46d0',
        'circle-opacity': 0.8
    };

    const getPaint = (route) => {
        const isClickedRoute = route.id === state.clickedRoute.id;
        const geometryType = route.geometry.type;
        debugger;

        if(!isClickedRoute){
            return (geometryType === 'LineString') ? linePaint : geometryType === 'Polygon' ? polygonPaint : circlePaint;
        }

        return (geometryType === 'LineString') ? clickedLinePaint : geometryType === 'Polygon' ? clickedPolygonPaint : clickedCirclePaint;


    };

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
       // initializeMap({ setMap, mapContainer });
    }, [state.center, zoom]);

    const onDrawCreate = ({ features }) => {
        console.log(features);
        if(features && !!features.length) {
            dispatch({type: 'ADD_MAP_ROUTE', payload: {route: features[0]}})
        }
    };

    const onDrawUpdate = ({ features }) => {
        console.log(features);
    };
    const onDrawDelete = ({ features }) => {
        console.log(features);
        if(features && !!features.length) {
            dispatch({type: 'DELETE_MAP_ROUTE', payload: {route: features[0]}})
        }
    };

    return <Mapbox ref={mapContainer} containerStyle={{height: "100vh", width: "100vw"}} zoom={[zoom]}
                   center={state.center} style={"mapbox://styles/mapbox/streets-v9"}>
                <DrawControl
                    ref={drawControl}
                    position="top-left"
                    displayControlsDefault={false}
                    controls={{point: true, line_string:true, polygon: true, trash: true}}
                    onDrawCreate={onDrawCreate}
                    onDrawUpdate={onDrawUpdate}
                    onDrawDelete={onDrawDelete}
                    boxSelect={true}
                />

                {state.routes && state.routes.map((route, index) => {
                    const geometryType = route.geometry.type === 'LineString' ? 'line' : route.geometry.type;
                    return (
                        <Layer
                            key={index}
                            type={geometryType === 'line' ? 'line' : geometryType === 'Polygon' ? 'fill' : 'circle'}
                            id={route.id}
                            layout={geometryType === 'line' ? lineLayout: {}}
                            paint={getPaint(route)}
                            //onClick={setChosenRoute(route)}
                            className={route.id === state.clickedRoute.id ? 'chosen-route' : ''}
                        >
                            <Feature coordinates={route.geometry.coordinates}/>
                        </Layer>
                    )
                })}
            </Mapbox>
};

export default MapboxGLMap;
