import {
    LOCATION,
    WEATHER,
    UNIT_CHANGE,
    RECALCULATE_TEMP, LANGUAGE_CHANGE, WEATHER_DAILY, PHOTO_URLS
} from "./Actions";
import {LANGUAGE, temperatureConventor, UNIT} from "../constraints/unitls";



const initialState = {
    language:LANGUAGE.RU,
    location: {lat:0, lng:0},
    weather:{},
    unit:UNIT.METRIC,
    weatherDaily:[],
    photoUrl:[]
};



function directorsRootReducer(state = initialState, action) {
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
        case PHOTO_URLS:
            return Object.assign({}, state, {photoUrl:[...action.photoUrl]});
        default:
            return state;
    }
}

export default directorsRootReducer;
