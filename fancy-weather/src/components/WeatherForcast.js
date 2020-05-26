import React from "react";
import {  useSelector} from 'react-redux';
import {WEATHER_CONDITIONS} from "../constraints/unitls";



const WeatherForecast = () => {
    const weatherDaily = useSelector(state => state.weatherDaily);
    const unit = useSelector(state => state.unit);

    let weather = weatherDaily.map((day, i) => {
        return <div key={i} className='forecastDetails'>
            <span>{day.date.toLocaleDateString()}</span>
            <span>{day.eve}{unit.SIGN}</span>
            <img src={WEATHER_CONDITIONS[day.main] ===  undefined ? '#' : WEATHER_CONDITIONS[day.main].ICON} alt={day.main} className='imgContainer'/>
        </div>;
    })

    return (
            <div className='weatherForeCast'>
                {weather}
            </div>
    )
}

export default WeatherForecast;
