import {
    LOCATION,
    WEATHER,
    UNIT_CHANGE,
    RECALCULATE_TEMP, LANGUAGE_CHANGE, WEATHER_DAILY
} from "./Actions";
import {LANGUAGE, temperatureConventor, UNIT} from "../constraints/unitls";



const initialState = {
    language:LANGUAGE.RU,
    location:{},
    weather:{},
    unit:UNIT.METRIC,
    weatherDaily:[]
};



function directorsRootReducer(state = initialState, action) {
    console.log('action:', action)
    switch (action.type) {
        case LOCATION :
            return Object.assign({}, state, {location:action.location});
        case WEATHER:
            return Object.assign({}, state, {weather:action.weather});
        case UNIT_CHANGE:
            return Object.assign({}, state, {unit:action.unit});
        case RECALCULATE_TEMP:
            state.weather.temp = temperatureConventor(action.unit.NAME, state.weather.temp);
            state.weather.feels_like = temperatureConventor(action.unit.NAME, state.weather.feels_like);
            state.weatherDaily.forEach((day) => {
                day.eve = temperatureConventor(action.unit.NAME, day.eve)
            })
            return state;
        case LANGUAGE_CHANGE:
            return Object.assign({}, state, {language:action.language});
        case WEATHER_DAILY:
            return Object.assign({}, state, {weatherDaily:action.weatherDaily});
        default:
            return state;
    }
}

export default directorsRootReducer;
