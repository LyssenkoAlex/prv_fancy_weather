import React, {useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {getWeather} from "../api/Weather";
import {weatherForecast} from '../state/Actions';
import {UNITS} from "../constraints/unitls";


const Weather = () => {
    const location = useSelector(state => state.location);
    const weather = useSelector(state => state.weather);
    const unit = useSelector(state => state.selectedUnit);
    const dispatch = useDispatch();

    useEffect(() => {
        if (location.lat !== undefined && location.lng !== undefined) {
            getWeather({
                lat: location.lat,
                lng: location.lng,
                language: 'RU',
                unit:UNITS.METRIC.NAME
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
            <div className='temperature'>{weather.temp}{UNITS[unit].SIGN}</div>
            <div className='weatherDetails'>
                <span>{weather.description}</span>
                <span>{weather.feels_like}{UNITS[unit].SIGN}</span>
                <ul>
                    <li>{weather.wind_speed}</li>
                    <li>{weather.humidity}</li>
                </ul>
            </div>
        </div>

    )
}

export default Weather;
