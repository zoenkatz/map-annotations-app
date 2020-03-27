export default function AppReducer (state, action){
    switch(action.type) {
        case "GET_ANNOTATIONS":
            return{
                ...state,
                annotations: action.payload.data
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
