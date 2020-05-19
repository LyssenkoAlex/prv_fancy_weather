import {
    LOCATION,
    WEATHER,
    UNIT_CHANGE,
    RECALCULATE_TEMP, LANGUAGE_CHANGE
} from "./Actions";
import {LANGUAGE, temperatureConventor, toCelsius, toFahrenheit, UNIT} from "../constraints/unitls";



const initialState = {
    language:LANGUAGE.RU,
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
            return Object.assign({}, state, {unit:action.unit});
        case RECALCULATE_TEMP:
            state.weather.temp = temperatureConventor(action.unit.NAME, state.weather.temp)
            state.weather.feels_like = temperatureConventor(action.unit.NAME, state.weather.feels_like)
            return state;
        case LANGUAGE_CHANGE:
            return Object.assign({}, state, {language:action.language});
        default:
            return state;
    }
}

export default directorsRootReducer;
