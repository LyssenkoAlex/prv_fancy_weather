export const LOCATION = 'LOCATION';
export const WEATHER = 'WEATHER';
export const UNIT_CHANGE = 'UNIT_CHANGE'


export function changeLocation(location) {
    return {type:LOCATION, location:location}
}

export function weatherForecast(weather) {
    return {type:WEATHER, weather:weather}
}

export function changeUnits(unit) {
    return {type:UNIT_CHANGE, unit:unit}
}
