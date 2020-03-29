import React, {useContext} from 'react'
import AppContext from "../AppContext";

const Annotationlist = () => {
    const {state} = useContext(AppContext);
    return (
        <div className="app-annotation-list">
            <ul>
                {state.routes && state.routes.map((route, index) => {
                    const routeType = route.geometry && route.geometry.type;
                    return (
                        <li key={index}>{routeType}</li>
                    )
                })}
            </ul>
        </div>
    );
};

export default Annotationlist;
