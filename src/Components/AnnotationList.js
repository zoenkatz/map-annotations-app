import React, {useContext, useCallback} from 'react'
import AppContext from "../AppContext";

const AnnotationList = () => {
    const {state, dispatch} = useContext(AppContext);
    const setChosenRoute = useCallback((clickedRoute) => {
        dispatch({type: 'SET_CLICKED_ROUTE', payload: {route: clickedRoute}})
    }, [dispatch]);

    return (
        <div className="app-annotation-list">
            <ul>
                {state.features && state.features.map((route, index) => {
                    const routeAddress = route.address;
                    return (
                        <li key={index} onClick={() => setChosenRoute(route)}
                            className={state.clickedRoute && route.id === state.clickedRoute.id ? 'chosen-route' : ''}>{routeAddress}</li>
                    )
                })}
            </ul>
        </div>
    );
};

export default AnnotationList;
