export const LOCATION = 'LOCATION';
export const WEATHER = 'WEATHER';
export const UNIT_CHANGE = 'UNIT_CHANGE';
export const RECALCULATE_TEMP = 'RECALCULATE_TEMP';
export const LANGUAGE_CHANGE = 'LANGUAGE_CHANGE';
export const WEATHER_DAILY = 'WEATHER_DAILY';


export const changeLocation = (location) => {
    return {type:LOCATION, location:location}
}

export const weatherForecast = (weather) => {
    return {type:WEATHER, weather:weather}
}

export const changeUnits = (unit) => {
    return {type:UNIT_CHANGE, unit:unit}
}

export const recalculateTemp = (unit) => {
    return {type:RECALCULATE_TEMP, unit:unit}
}

export const changeLanguage = (language) => {
    return {type:LANGUAGE_CHANGE, language:language}
}

export const weatherDaily = (weather) => {
    return {type:WEATHER_DAILY, weatherDaily:weather}
}
