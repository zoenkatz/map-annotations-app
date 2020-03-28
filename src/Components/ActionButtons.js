import React, {useContext, useCallback} from 'react';
import AppContext from "../AppContext";

const ActionButtons = () => {
    const {dispatch} = useContext(AppContext);
    const startDrawing = useCallback((e) => {
        const targetValue = e.target && e.target.value;
        switch (targetValue) {
            case 'POLYGON':
                return dispatch({type:'SET_IS_DRAW_POLYGON', payload: {isDrawPolygon: true}});
            case 'LINE':
                return dispatch({type:'SET_IS_DRAW_LINE', payload: {isDrawLine: true}});
            case 'POINT':
                return dispatch({type:'SET_IS_DRAW_POINT', payload: {isDrawPoint: true}});

        }
    }, []);

    return (
        <div className="app-action-buttons">
            <input type="button" onClick={startDrawing} name="point" value="POINT" />
            <input type="button" onClick={startDrawing} name="line" value="LINE" />
            <input type="button" onClick={startDrawing} name="polygon" value="POLYGON" />
        </div>
    )
};

export default ActionButtons;
