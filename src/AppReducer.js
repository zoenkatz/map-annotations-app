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
        case "ADD_MAP_ROUTE":
            const newRoutes = [...state.routes, action.payload.route];
            return {
              ...state,
              routes: newRoutes
            };
        case "SET_CLICKED_ROUTE":
            return {
                ...state,
                clickedRoute: action.payload.route
            };

        case 'SET_DRAW_CONTROL_REF':
            return {
              ...state,
                drawControlRef: action.payload.drawControlRef
            };
        case 'DELETE_MAP_ROUTE':
            const remainRoutes = state.routes.filter(route => route.id === action.payload.route.id);
            return {
              ...state,
                routes: remainRoutes
            };
        case 'SET_FEATURES':
            return {
                ...state,
                features: action.payload.features
            };

        default:
            return state
    }
}
