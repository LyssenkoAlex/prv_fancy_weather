import React, {useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {getWeather} from "../api/Weather";
import {photoUrls, weatherDaily, weatherForecast} from '../state/Actions';
import {
    getDayDayPeriod,
    getSeason,
    TRANS_WORDS,
    updateBackgroundImage,
    WEATHER_CONDITIONS
} from "../constraints/unitls";
import {getImages} from "../api/Images";


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
                unit: unit.NAME
            }).then((weather) => {
                dispatch(weatherForecast({
                    description: weather.current.weather[0].description
                    , temp: Math.round(weather.current.temp)
                    , feels_like: Math.round(weather.current.feels_like)
                    , wind_speed: weather.current.wind_speed
                    , humidity: weather.current.humidity
                    , main: weather.current.weather[0].main
                    , timezone: weather.timezone
                    , timezone_offset: weather.timezone_offset
                    , icon: weather.current.weather[0].icon
                }))
                let dailyWeather = [];
                weather.daily.slice(1, 5).forEach((day) => {
                    dailyWeather.push({
                        date: new Date(day.dt * 1000),
                        eve: Math.round(day.temp.eve),
                        main: day.weather[0].main,
                        icon: day.weather[0].icon
                    })
                })

                getImages({
                    city: location.name,
                    season: getSeason(),
                    dayPeriod: getDayDayPeriod(weather.timezone_offset)
                }).then((imagesArray) => {
                    dispatch(photoUrls(imagesArray));
                    if (imagesArray.length > 0) {
                        updateBackgroundImage(imagesArray[Math.floor(Math.random() * Math.floor(imagesArray.length))].url_h)
                    }
                })

                dispatch(weatherDaily(dailyWeather))
            });
        }

    }, [location]);

    if (!location) return false;

    return (
        <div className='weather'>
            <div className='temperature'>
                <div className='temperature_place'>
                    {location.name}
                </div>
                <div className='temperature_temp'>
                    {weather.temp}{unit.SIGN}
                </div>
            </div>
            <div className='weatherDetails'>
                <span>{weather.description}</span>
                <div className='img_wrapper'>
                    <img
                        src={WEATHER_CONDITIONS[weather.main] === undefined ? '#' : WEATHER_CONDITIONS[weather.main].ICON}
                        alt={weather.main} className='imgContainer'/>
                </div>
                <span>{TRANS_WORDS.FEELS_LIKE[language.TITLE]}: {weather.feels_like}{unit.SIGN}</span>
                <ul>
                    <li>{TRANS_WORDS.SPEED[language.TITLE]}: {weather.wind_speed}{TRANS_WORDS.M_S[language.TITLE]}</li>
                    <li>{TRANS_WORDS.HUMIDITY[language.TITLE]}: {weather.humidity}%</li>
                </ul>
            </div>
        </div>
    )
}

export default Weather;
