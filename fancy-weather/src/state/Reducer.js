import {
    LOCATION,
    WEATHER,
    UNIT_CHANGE,
    RECALCULATE_TEMP
} from "./Actions";
import {LANGUAGE, toCelsius, toFahrenheit, UNIT} from "../constraints/unitls";



const initialState = {
    language:LANGUAGE.RU.VALUE,
    location:{},
    weather:{},
    unit:UNIT.METRIC,
};



function directorsRootReducer(state = initialState, action) {
    console.log('action:', action)
    let newTemp;
    switch (action.type) {
        case LOCATION :
            return Object.assign({}, state, {location:action.location});
        case WEATHER:
            return Object.assign({}, state, {weather:action.weather});
        case UNIT_CHANGE:
            console.log('case unit')
            return Object.assign({}, state, {unit:action.unit});
        case RECALCULATE_TEMP:

            if(action.unit.NAME === UNIT.IMPERIAL.NAME) {
                newTemp =  toCelsius(state.weather.temp);
            }
            else {
                 newTemp =  toFahrenheit(state.weather.temp);
            }
            state.weather.temp = newTemp;
            return state;

        default:
            return state;
    }
}

export default directorsRootReducer;
