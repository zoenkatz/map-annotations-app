export default function AppReducer (state, action){
    switch(action.type) {
        case "SET_MAP_CENTER":
            return {
                ...state,
                center: action.payload.center
            };
        case "SET_QUERY":
            return {
                ...state,
                query: action.payload.query
            };
        case "SET_IS_DRAW_POLYGON":
            return {
                ...state,
                isDrawPolygon: action.payload.isDrawPolygon,
                isDrawPoint: false,
                isDrawLine: false

            };
        case "SET_IS_DRAW_POINT":
            return {
                ...state,
                isDrawPoint: action.payload.isDrawPoint,
                isDrawPolygon: false,
                isDrawLine: false
            };
        case "SET_IS_DRAW_LINE":
            return {
                ...state,
                isDrawLine: action.payload.isDrawLine,
                isDrawPoint: false,
                isDrawPolygon: false
            };

        default:
            return state
    }
}
