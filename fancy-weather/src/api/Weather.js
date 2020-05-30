import { getWeatherByCoordinatesURL } from '../constraints/fetchUrl';

const getWeather = async (config) => {
	const url = getWeatherByCoordinatesURL(config);
	const response = await fetch(url);
	return response.json();
};

export default getWeather;
