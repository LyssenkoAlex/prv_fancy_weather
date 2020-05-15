export const LOCATION = 'LOCATION';
export const WEATHER = 'WEATHER';


export function changeLocation(location) {
    return {type:LOCATION, location:location}
}

export function weatherForecast(weather) {
    return {type:WEATHER, weather:weather}
}
