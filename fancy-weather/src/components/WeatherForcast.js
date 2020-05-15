import React from "react";
import { useDispatch, useSelector} from 'react-redux';



const WeatherForecast = () => {
    const location = useSelector(state => state.location);
    return (

            <div className='weatherForeCast'>
                <div>today101</div>
                <div>today2</div>
                <div>today3</div>
                <div>today4</div>
                <div>{location}</div>
            </div>
    )
}

export default WeatherForecast;
