
import { getWeatherByCoordinatesURL } from '../constraints/fetchUrl';

export const getWeather = async (config) => {
    const url = getWeatherByCoordinatesURL(config);
    const response = await fetch(url);
    return response.json();
};
