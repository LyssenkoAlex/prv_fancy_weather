export const UNITS = { IMPERIAL: { TYPE: 'imperial', SIGN: '°F', NAME: 'IMPERIAL' }, METRIC: { TYPE: 'metric', SIGN: '°C', NAME: 'METRIC' } };
export const LANGUAGE = { RU: { TITLE: 'RU', VALUE: 'ru' }, ENG: { TITLE: 'ENG', VALUE: 'en' }, KAZ: { TITLE: 'KAZ', VALUE: 'kk' } };

export const toCelsius = (fahrenheit) => {
    return (fahrenheit - 32) * 5 / 9;
}

export const  toFahrenheit = (celsius) => {
    return (celsius * 9 / 5) + 32;
}
