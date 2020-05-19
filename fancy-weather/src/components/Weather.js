import React, {useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {getWeather} from "../api/Weather";
import {weatherForecast} from '../state/Actions';
import {TRANS_WORDS} from "../constraints/unitls";


const Weather = () => {
    const location = useSelector(state => state.location);
    const weather = useSelector(state => state.weather);
    const unit = useSelector(state => state.unit);
    const language = useSelector(state => state.language);

    const dispatch = useDispatch();

    useEffect(() => {
        if (location.lat !== undefined && location.lng !== undefined) {
            getWeather({
                lat: location.lat,
                lng: location.lng,
                language: 'RU',
                unit:unit.NAME
            }).then((weather) => {
                console.log('weather', weather.current)
                dispatch(weatherForecast({description:weather.current.weather[0].description
                    , temp:weather.current.temp
                    , feels_like:weather.current.feels_like
                    , wind_speed:weather.current.wind_speed
                    , humidity:weather.current.humidity
                }))});
        }

    }, [location]);

    if (!location) return false;

    return (
        <div className='weather'>
            <div className='temperature'>{weather.temp}{unit.SIGN}</div>
            <div className='weatherDetails'>
                <span>{weather.description}</span>
                <span>{TRANS_WORDS.FEELS_LIKE[language.TITLE]}: {weather.feels_like}{unit.SIGN}</span>
                <ul>
                    <li>{TRANS_WORDS.SPEED[language.TITLE]}: {weather.wind_speed}</li>
                    <li>{TRANS_WORDS.HUMIDITY[language.TITLE]}: {weather.humidity}</li>
                </ul>
            </div>
        </div>

    )
}

export default Weather;
