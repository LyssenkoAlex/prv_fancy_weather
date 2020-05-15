import React, {useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {getWeather} from "../api/Weather";
import {weatherForecast} from '../state/Actions';


const Weather = () => {
    const location = useSelector(state => state.location);
    const weather = useSelector(state => state.weather);
    const dispatch = useDispatch();

    useEffect(() => {
        if (location.lat !== undefined && location.lng !== undefined) {
            getWeather({
                lat: location.lat,
                lng: location.lng,
                language: 'RU'
            }).then((weather) => {
                console.log('weather', weather.current.weather[0].main)
                dispatch(weatherForecast({main:weather.current.weather[0].main}))});
        }

    }, [location]);

    if (!location) return false;
    return (
        <div className='weather'>
            <div className='temperature'>15C</div>
            <div className='weatherDetails'>
                <span>{weather.main}</span>
                <span>Clear</span>
                <ul>
                    <li>{location.lat}</li>
                    <li>17D</li>
                </ul>
            </div>
        </div>

    )
}

export default Weather;
