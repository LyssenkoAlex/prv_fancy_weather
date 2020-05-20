export const UNIT = { IMPERIAL: { TYPE: 'imperial', SIGN: '°F', NAME: 'IMPERIAL' }, METRIC: { TYPE: 'metric', SIGN: '°C', NAME: 'METRIC' } };
export const LANGUAGE = { RU: { TITLE: 'RU', VALUE: 'ru' }, ENG: { TITLE: 'ENG', VALUE: 'en' }, KAZ: { TITLE: 'KAZ', VALUE: 'kk' } };

export const TRANS_WORDS = {
    WEATHER: { RU: 'погода', ENG: 'weather', KAZ: 'aýa-raıy' },
    HUMIDITY: { RU: 'влажность', ENG: 'Humidity', KAZ: 'Ylǵaldylyǵy' },
    PRESSURE: { RU: 'давление', ENG: 'pressure', KAZ: 'qysym' },
    SPEED: { RU: 'скорость ветра', ENG: 'wind speed', KAZ: 'jel jıldamdığı' },
    SEARCH: { RU: 'поиск', ENG: 'Search', KAZ: 'izdeý' },
    ENTER: { RU: 'введите город', ENG: 'enter city', KAZ: 'qalaǵa kirińiz' },
    LATITUDE: { RU: 'широта', ENG: 'Latitude:', KAZ: 'endik' },
    LONGITUDE: { ENG: 'longitude', RU: 'долгота', KAZ: 'boılyq' },
    FEELS_LIKE: { ENG: 'feels like', RU: 'ощущается как', KAZ: 'Sïyaqtı'}
};

export const toCelsius = (fahrenheit) => {
    return Math.round((fahrenheit - 32) * 5 / 9);
}

export const  toFahrenheit = (celsius) => {
    return Math.round((celsius * 9 / 5) + 32);
}

export const temperatureConventor = (unitName, temp) => {
    let toReturn;
    if(unitName === UNIT.IMPERIAL.NAME) {
        toReturn =  toCelsius(temp);
    }
    else {
        toReturn =  toFahrenheit(temp);
    }
    return toReturn;
}

export const getSeason = () => {
    const today = new Date();
    const seasonItem = Math.floor((today.getMonth() / 12 * 4)) % 4;
    return ['Summer', 'Autumn', 'Winter', 'Spring'][seasonItem];
};

export const getDayDayPeriod = (timeZone) => {
    const today = new Date();
    const uts = new Date();
    if (timeZone !== 0) {
        uts.setHours(today.getHours() + today.getTimezoneOffset() / 60 + (timeZone / 60 / 60));
    }
    return uts.getHours() < 12 ? 'morning' : uts.getHours() < 18 ? 'afternoon' : 'evening';
};

export const getUTCTime = () => {
    const now = new Date();
    return Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),
        now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
};
