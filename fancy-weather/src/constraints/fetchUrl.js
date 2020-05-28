const WEATHER_KEY = 'a495f9095a5e73c90ffd69a52f0d4bc0';
const IP_INFO = '202bfb8af6b203';
const GOOGLE_PLACES = 'AIzaSyDLtbR-1ej--aUKizSNcgJJYIKz_KuSUNA';
const YANDEX_KEY = 'trnsl.1.1.20191209T024748Z.9eb2df4f5e1d2e9a.df86f4d226cbc1e6580f38404715890d2888a94a';
const UNSPLASH_KEY = '71d2ca753c7333a8e0b3d60ed1b8bdeb9ab30030606c6eae04bb6836ead2abe9';
export const MAP_BOX_KEY = 'pk.eyJ1IjoibHlzc2Vua29hbGV4IiwiYSI6ImNrM2ZxcWF3MDAwYjgzY3NlNndmb3p2c2EifQ.Aaf7-bWQOS3CcOgLVRs9gA';
const FLICKER_KEY = '2c4db4310cd6407c99fd12d0194dcea3';





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

export const getImageByCityURL = (config) => {
    return `https://api.unsplash.com/photos/random?query=town,${config.weather},${config.season},${config.dayPeriod},${config.city}&client_id=${UNSPLASH_KEY}`;
}

export const getFlickerImage = (config) => {
    return `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${FLICKER_KEY}&tags=${config.season},${config.dayPeriod},${config.city}&tag_mode=and
    &extras=url_h&format=json&nojsoncallback=1&per_page=5
`
}

