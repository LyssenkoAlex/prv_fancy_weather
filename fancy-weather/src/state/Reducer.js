import {
    LOCATION,
    WEATHER
} from "./Actions";



const initialState = {
    language:'RU',
    location:{},
    weather:{}
};



function directorsRootReducer(state = initialState, action) {
    console.log('action:', action)
    switch (action.type) {
        case LOCATION :
            return Object.assign({}, state, {location:action.location});
        case WEATHER:
            return Object.assign({}, state, {weather:action.weather});
        default:
            return state;
    }
}

export default directorsRootReducer;
