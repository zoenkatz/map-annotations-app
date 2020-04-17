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
        case "SET_CLICKED_ROUTE":
            return {
                ...state,
                clickedRoute: action.payload.route
            };
        case 'DELETE_MAP_ROUTE':
            const remainFeatures = state.features.filter(route => route.id !== action.payload.route.id);
            return {
              ...state,
                features: remainFeatures
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
