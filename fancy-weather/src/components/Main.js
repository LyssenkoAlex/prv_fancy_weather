import React, {useEffect} from 'react'
import SearchLocationInput from "./SearchLocationInput";
import Weather from "./Weather";
import WeatherForecast from "./WeatherForcast";
import {useDispatch, useSelector} from "react-redux";
import {getLocation} from "../api/IPInfo";
import {changeLocation, photoUrls} from "../state/Actions";
import {getImages} from "../api/Images";
import {getDayDayPeriod, getSeason, updateBackgroundImage} from "../constraints/unitls";
import Map from "./Map";

const Main = () => {
    const locationState = useSelector(state => state.location);
    const images = useSelector(state => state.photoUrl);
    const weather = useSelector(state => state.weather);
    const dispatch = useDispatch();


    useEffect(() => {
        async function updateLocation() {
            if (locationState.lat === undefined) {
                let location = await getLocation();
                    dispatch(changeLocation({
                        name: `${location.region} , ${location.city}`,
                        lat: location.loc.split(',')[0],
                        lng: location.loc.split(',')[1],
                    }))
            }
        }
            updateLocation();
    }, []);


    return (
        <div className='wrapper'>
            <div className='sunny info_card'>
                <SearchLocationInput/>
                <Weather/>
                <WeatherForecast/>
            </div>
            <div className='map'>
                <Map/>
            </div>
        </div>
    );
}



export default Main;
