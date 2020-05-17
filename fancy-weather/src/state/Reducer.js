import {
    LOCATION,
    WEATHER
} from "./Actions";
import {LANGUAGE, UNITS} from "../constraints/unitls";



const initialState = {
    language:LANGUAGE.RU.VALUE,
    location:{},
    weather:{},
    unit:UNITS.METRIC.NAME,
    selectedUnit:UNITS.METRIC.NAME
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
