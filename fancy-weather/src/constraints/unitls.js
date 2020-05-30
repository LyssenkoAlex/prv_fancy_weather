import ClearIcon from '../assets/weather_icons/01d.png';
import CloudsIcon from '../assets/weather_icons/02d.png';
import DrizzleIcon from '../assets/weather_icons/09d.png';
import RainleIcon from '../assets/weather_icons/10d.png';
import ThunderstormIcon from '../assets/weather_icons/11n.png';
import SnowIcon from '../assets/weather_icons/13d.png';
import SmokeIcon from '../assets/weather_icons/50d.png';
import FogIcon from '../assets/weather_icons/50d.png';

export const UNIT = { IMPERIAL: { TYPE: 'imperial', SIGN: '°F', NAME: 'IMPERIAL' }, METRIC: { TYPE: 'metric', SIGN: '°C', NAME: 'METRIC' } };
export const LANGUAGE = { RU: { TITLE: 'RU', VALUE: 'ru', REC:'ru' }, ENG: { TITLE: 'ENG', VALUE: 'en', REC:'en-US' }, KAZ: { TITLE: 'KAZ', VALUE: 'kk', REC:'ru' } };

export const TRANS_WORDS = {
    WEATHER: { RU: 'погода', ENG: 'weather', KAZ: 'aýa-raıy' },
    HUMIDITY: { RU: 'влажность', ENG: 'Humidity', KAZ: 'Ylǵaldylyǵy' },
    PRESSURE: { RU: 'давление', ENG: 'pressure', KAZ: 'qysym' },
    SPEED: { RU: 'скорость ветра', ENG: 'wind speed', KAZ: 'jel jıldamdığı' },
    SEARCH: { RU: 'поиск', ENG: 'Search', KAZ: 'izdeý' },
    ENTER: { RU: 'введите город', ENG: 'enter city', KAZ: 'qalaǵa kirińiz' },
    LATITUDE: { RU: 'широта', ENG: 'Latitude:', KAZ: 'endik' },
    LONGITUDE: { ENG: 'longitude', RU: 'долгота', KAZ: 'boılyq' },
    FEELS_LIKE: { ENG: 'feels like', RU: 'ощущается как', KAZ: 'Sïyaqtı'},
    M_S:{ENG: 'm/s', RU: 'м/с', KAZ: 'm/e'}
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
    return ['Winter', 'Spring', 'Summer', 'Autumn'][seasonItem];
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

export const WEATHER_CONDITIONS = {
    Clear: {
        MAIN: 'Clear', IMG: '01d.png', Description: 'Clear', ICON: ClearIcon
    },
    Clouds: {
        MAIN: 'Clouds', IMG: '02d.png', Description: 'Clouds', ICON: CloudsIcon
    },
    Drizzle: {
        MAIN: 'Drizzle', IMG: '09d.png', Description: 'drizzle', ICON: DrizzleIcon
    },
    Rain: {
        MAIN: 'Rain', IMG: '10d.png', Description: 'Rain', ICON: RainleIcon
    },
    Thunderstorm: {
        MAIN: 'Thunderstorm', IMG: '11n.png', Description: 'Description', ICON: ThunderstormIcon
    },
    Snow: {
        MAIN: 'Snow', IMG: '13d.png', Description: 'Snow', ICON: SnowIcon
    },
    Smoke: {
        MAIN: 'Smoke', IMG: '50d.png', Description: 'Smoke', ICON: SmokeIcon
    },
    Fog: {
        MAIN: 'Fog', IMG: '50d.png', Description: 'Fog', ICON: FogIcon
    }

};

export const  updateBackgroundImage = (url) => {
    const bcgEL = document.querySelector('.sunny');
    bcgEL.style.background = `url(${url}) no-repeat center center fixed`;
    bcgEL.style.backgroundSize = 'cover';
    bcgEL.style.overflow = 'hidden';
}
