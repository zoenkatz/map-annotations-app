import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const styles = {
    width: "100vw",
    height: "100vw",
    position: "absolute"
};

const MapboxGLMap = () => {
    const [map, setMap] = useState(null);
    const mapContainer = useRef(null);

    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1Ijoiem9lbmthdHoiLCJhIjoiY2s3cmMzeDlvMDNnaDNlcGdpcDJxYTYxcyJ9.Wc97-chR3WRSOdDbM0PTNg';
        const initializeMap = ({ setMap, mapContainer }) => {
            const map = new mapboxgl.Map({
                container: mapContainer.current,
                style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
                center: [0, 0],
                zoom: 5
            });

            map.on("load", () => {
                setMap(map);
                map.resize();
            });
        };

        if (!map) initializeMap({ setMap, mapContainer });
    }, [map]);

    return <div ref={el => (mapContainer.current = el)} style={styles} />;
};

export default MapboxGLMap;