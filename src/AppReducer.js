export default function AppReducer (state, action){
    switch(action.type) {
        case "SET_MAP_CENTER":
            return{
                ...state,
                center: action.payload.center
            };
        case "SET_QUERY":
            return{
                ...state,
                query: action.payload.query
            };

        default:
            return state
    }
}
