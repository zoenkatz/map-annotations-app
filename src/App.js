import React, {useContext, useReducer, useEffect, useState} from 'react';
//import './index.scss';
import axios from 'axios';
import AppContext from './AppContext';
import AppReducer from './AppReducer';
import './App.scss';
//import Geocoder from '@mapbox/react-geocoder';
//import Geocoder from 'react-geocoder-autocomplete'
//import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import MapboxGLMap from './Components/MapboxGLMap';
import SearchBar from "./Components/SearchBar";
import ActionButtons from "./Components/ActionButtons";
import Annotationlist from "./Components/AnnotationList";

function App (){
    const initialState = useContext(AppContext);
    const [state, dispatch] = useReducer(AppReducer, initialState);
    const useApi = (endpoint) => {
        const [mapCenter, setMapCenter] = useState([]);
        const getData = async () => {
            const response = await axios.get(endpoint);
            setMapCenter(response.data.features[0].center);
        };

        useEffect(() => {
            getData();
        }, [state.query]);



        return mapCenter;
    };

    const savedResponseMapCenter = useApi(`https://api.mapbox.com/geocoding/v5/mapbox.places/${state.query}.json?access_token=pk.eyJ1Ijoiem9lbmthdHoiLCJhIjoiY2s3cmMzeDlvMDNnaDNlcGdpcDJxYTYxcyJ9.Wc97-chR3WRSOdDbM0PTNg`);

    useEffect(() => {
        if(savedResponseMapCenter && !!savedResponseMapCenter.length) {
            dispatch({
                type: "SET_MAP_CENTER",
                payload: {center: savedResponseMapCenter}
            });
        }

    }, [savedResponseMapCenter]);


    return (
       <AppContext.Provider value={{state, dispatch}}>
           <div className="app-map-annotations">
               <div className="app-info">
                   <SearchBar/>
                    <ActionButtons/>
                   <Annotationlist/>
               </div>
               <div className="app-map">
                   <MapboxGLMap/>
               </div>
           </div>
       </AppContext.Provider>
    );

}

export default App;
