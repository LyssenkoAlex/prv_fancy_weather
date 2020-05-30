/* eslint-disable react/jsx-filename-extension,react/jsx-indent */

import * as React from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Time = () => {
	const [time, setTime] = useState(new Date());
	const weather = useSelector((state) => state.weather);

	useEffect(() => {
		const timer = setInterval(() => tick(), 1000);
		return function cleanup() {
			clearInterval(timer);
		};
	});

	function tick() {
		const uts = new Date();
		const today = new Date();
		if (weather.timezone_offset !== 0) {
			uts.setHours(today.getHours() + today.getTimezoneOffset() / 60 + weather.timezone_offset / 60 / 60);
		}
		setTime(new Date(uts));
	}

	const h = time.getHours();
	const m = time.getMinutes();
	const s = time.getSeconds();

	return (
		<span>
			{h % 12}:{m < 10 ? `0${m}` : m}:{s < 10 ? `0${s}` : s} {h < 12 ? 'am' : 'pm'}
		</span>
	);
};

export default Time;
