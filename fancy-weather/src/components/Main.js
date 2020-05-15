import React, {useState, useEffect, useRef} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {getLocation} from "../api/IPInfo";
import {getPlaces} from "../api/Places";
import SearchLocationInput from "./SearchLocationInput";
import Weather from "./Weather";
import WeatherForecast from "./WeatherForcast";


const Main = () => {

    const inputRef = useRef()
    const [city, setCity] = useState('Almaty');

    useEffect(() => {

        setTimeout(() => {
            getLocation().then((location) => console.log(location.city));
            getPlaces({}).then((places) => console.log(places));
        }, 600)

    }, [city, inputRef]);

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

export default Main;
