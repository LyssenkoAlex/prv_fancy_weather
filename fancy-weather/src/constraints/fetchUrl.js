const WEATHER_KEY = 'a495f9095a5e73c90ffd69a52f0d4bc0';
const IP_INFO = '202bfb8af6b203';
const GOOGLE_PLACES = 'AIzaSyDLtbR-1ej--aUKizSNcgJJYIKz_KuSUNA';


export const getWeatherByCoordinatesURL = (config) => {
    return `https://api.openweathermap.org/data/2.5/onecall?lat=${config.lat}&lon=${config.lng}&lang=${config.language}&exclude=minutely,hourly&units=${config.unit}&APPID=${WEATHER_KEY}`;
}

export const getUserLocationCoordinates = () => {
    return `https://ipinfo.io/?token=${IP_INFO}`;
}


export const getPlacesByFirstLetters = (config) => {
    return `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=Alm&key=${GOOGLE_PLACES}&sessiontoken=${config.session}`;
}


