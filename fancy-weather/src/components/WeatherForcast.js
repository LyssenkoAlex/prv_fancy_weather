import React from "react";
import {  useSelector} from 'react-redux';



const WeatherForecast = () => {
    const weatherDaily = useSelector(state => state.weatherDaily);
    const unit = useSelector(state => state.unit);

    let weather = weatherDaily.map((day, i) => {
        return <div key={i} className='forecastDetails'>
            <span>{day.date.toLocaleDateString()}</span>
            <span>{day.eve}{unit.SIGN}</span>
            <span>{day.main}</span>
        </div>;
    })

    return (
            <div className='weatherForeCast'>
                {weather}
            </div>
    )
}

export default WeatherForecast;
