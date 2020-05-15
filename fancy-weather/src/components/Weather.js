import React from "react";
import {  useSelector} from 'react-redux';


const Weather = () => {
    const location = useSelector(state => state.location);

    return (
        <div className='weather'>
            <div className='temperature'>15C</div>
            <div className='weatherDetails'>
                <span>{location}</span>
                <span>Clear</span>
                <ul>
                    <li>15U</li>
                    <li>17D</li>
                </ul>
            </div>
        </div>

    )
}

export default Weather;
