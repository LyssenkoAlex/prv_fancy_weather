import React, {useEffect} from 'react'
import SearchLocationInput from "./SearchLocationInput";
import Weather from "./Weather";
import WeatherForecast from "./WeatherForcast";
import {useDispatch, useSelector} from "react-redux";
import {getLocation} from "../api/IPInfo";
import {changeLocation} from "../state/Actions";
import {getImages} from "../api/Images";
import {getDayDayPeriod, getSeason} from "../constraints/unitls";
import Map from "./Map";


const Main = () => {
    const location = useSelector(state => state.location);
    const dispatch = useDispatch();
    const weather = useSelector(state => state.weather);


    useEffect(() => {
        async function updateLocationImage() {
            if (location.lat === undefined) {
                let location = await getLocation();
                    dispatch(changeLocation({
                        name: `${location.region} , ${location.city}`,
                        lat: location.loc.split(',')[0],
                        lng: location.loc.split(',')[1],
                    }))
            }
            let image = await getImages({
                city: location.name,
                weather: weather.main,
                season: getSeason(),
                dayPeriod: getDayDayPeriod(weather.timezone_offset)
            });
            updateBackgroundImage(image.urls.regular)
        }
        updateLocationImage();


    }, [location, weather]);


    return (
        <div className='wrapper'>
            <div className='sunny info_card'>
                <SearchLocationInput/>
                <Weather/>
                <WeatherForecast/>
            </div>
            <div className='map'>
                <Map/>
                {/*<span>map</span>*/}
            </div>
        </div>
    );
}

function updateBackgroundImage (url) {
        const bcgEL = document.querySelector('.sunny');
        bcgEL.style.background = `url(${url}) no-repeat center center fixed`;
        bcgEL.style.backgroundSize = 'cover';
        // bcgEL.style.height = '100%';
        bcgEL.style.overflow = 'hidden';
}

export default Main;
