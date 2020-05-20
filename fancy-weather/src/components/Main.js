import React, {useEffect} from 'react'
import SearchLocationInput from "./SearchLocationInput";
import Weather from "./Weather";
import WeatherForecast from "./WeatherForcast";
import {useDispatch, useSelector} from "react-redux";
import {getLocation} from "../api/IPInfo";
import {changeLocation} from "../state/Actions";
import {getImages} from "../api/Images";
import {getDayDayPeriod, getSeason} from "../constraints/unitls";


const Main = () => {
    const location = useSelector(state => state.location);
    const dispatch = useDispatch();
    const weather = useSelector(state => state.weather);


    useEffect(() => {
        console.log('init location: ', location === null)
        async function updateLocationImage() {
            if (location.lat === undefined) {
                let location = await getLocation();
                    console.log('city: ', location)
                    dispatch(changeLocation({
                        name: `${location.region} , ${location.city}`,
                        lat: location.loc.split(',')[0],
                        lng: location.loc.split(',')[1],
                    }))
            }

            let image = await getImages({
                city: location.name,
                weather: weather.name,
                season: getSeason(),
                dayPeriod: getDayDayPeriod(weather.timezone_offset)
            });
            console.log('image', image)
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
                map
            </div>
        </div>
    );
}

function updateBackgroundImage (url) {
        const bcgEL = document.querySelector('.wrapper');
        bcgEL.style.background = `url(${url}) no-repeat center center fixed`;
        bcgEL.style.backgroundSize = 'cover';
        bcgEL.style.height = '100%';
        bcgEL.style.overflow = 'hidden';
}

export default Main;
