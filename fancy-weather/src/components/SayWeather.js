/* eslint-disable react/jsx-filename-extension,react/jsx-indent */
import React from 'react';
import { useSelector } from 'react-redux';
import sayText from '../api/SayWeather';

const SayWeather = () => {
	const weather = useSelector((state) => state.weather);

	const speak = () => {
		const lang = 'ru-RU';
		const text = `Температура ${weather.temp} ощущается ${weather.feels_like} скорость ветра ${weather.wind_speed}`;
		sayText(text, lang);
	};

	return (
		<button type="button" className="play" onClick={() => speak()}>
			&#9658;
		</button>
	);
};

export default SayWeather;
