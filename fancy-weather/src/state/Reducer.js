import {
    LOCATION,
    WEATHER,
    UNIT_CHANGE
} from "./Actions";
import {LANGUAGE, UNIT} from "../constraints/unitls";



const initialState = {
    language:LANGUAGE.RU.VALUE,
    location:{},
    weather:{},
    unit:UNIT.METRIC,
};



function directorsRootReducer(state = initialState, action) {
    console.log('action:', action)
    switch (action.type) {
        case LOCATION :
            return Object.assign({}, state, {location:action.location});
        case WEATHER:
            return Object.assign({}, state, {weather:action.weather});
        case UNIT_CHANGE:
            console.log('case unit')
            return Object.assign({}, state, {unit:action.unit});
        default:
            return state;
    }
}

export default directorsRootReducer;
