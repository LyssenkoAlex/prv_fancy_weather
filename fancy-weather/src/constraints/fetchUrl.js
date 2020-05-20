const WEATHER_KEY = 'a495f9095a5e73c90ffd69a52f0d4bc0';
const IP_INFO = '202bfb8af6b203';
const GOOGLE_PLACES = 'AIzaSyDLtbR-1ej--aUKizSNcgJJYIKz_KuSUNA';
const YANDEX_KEY = 'trnsl.1.1.20191209T024748Z.9eb2df4f5e1d2e9a.df86f4d226cbc1e6580f38404715890d2888a94a';



export const getWeatherByCoordinatesURL = (config) => {
    return `https://api.openweathermap.org/data/2.5/onecall?lat=${config.lat}&lon=${config.lng}&lang=${config.language}&exclude=minutely,hourly&units=${config.unit}&APPID=${WEATHER_KEY}`;
}

export const getUserLocationCoordinates = () => {
    return `https://ipinfo.io/?token=${IP_INFO}`;
}


export const getPlacesByFirstLetters = (config) => {
    return `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=Alm&key=${GOOGLE_PLACES}&sessiontoken=${config.session}`;
}

export const getYandexTranslateURL= (config) => {
    return `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${YANDEX_KEY}&text=${config.text}&lang=${config.from_lang}-${config.to_lang}&format=plain`;
}

