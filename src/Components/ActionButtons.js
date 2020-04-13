import React, {useContext, useCallback} from 'react';
import AppContext from "../AppContext";

const ActionButtons = () => {
    const {state, dispatch} = useContext(AppContext);
    const onDrawCreate = ({ features }) => {
        console.log(features);
        if(features && !!features.length) {
            dispatch({type: 'ADD_MAP_ROUTE', payload: {route: features[0]}})
        }
    };
    const startDrawing = useCallback((e) => {
        console.log(state.drawControlRef, "drawRef");
        const targetValue = e.target && e.target.value;
        switch (targetValue) {
            case 'POLYGON':
                return dispatch({type:'SET_IS_DRAW_POLYGON', payload: {isDrawPolygon: true}});
            case 'LINE':
                return dispatch({type:'SET_IS_DRAW_LINE', payload: {isDrawLine: true}});
            case 'POINT':
                return dispatch({type:'SET_IS_DRAW_POINT', payload: {isDrawPoint: true}});

        }
    }, [dispatch, state.drawControlRef]);

    return (
        <div className="app-action-buttons">
            <input type="button" onClick={onDrawCreate} name="point" value="POINT" />
            <input type="button" onClick={startDrawing} name="line" value="LINE" />
            <input type="button" onClick={startDrawing} name="polygon" value="POLYGON" />
        </div>
    )
};

export default ActionButtons;
