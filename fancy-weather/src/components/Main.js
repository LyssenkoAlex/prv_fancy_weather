import React, {useState, useEffect, useRef} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {getLocation} from "../api/IPInfo";
import {getPlaces} from "../api/Places";
import SearchLocationInput from "./SearchLocationInput";


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
                <div className='weather'>
                    <div className='temperature'>15C</div>
                    <div className='weatherDetails'>
                        <span>Monday</span>
                        <span>Clear</span>
                        <ul>
                            <li>15U</li>
                            <li>17D</li>
                        </ul>
                    </div>
                </div>
                <div className='weatherForeCast'>
                    <div>today101</div>
                    <div>today2</div>
                    <div>today3</div>
                    <div>today4</div>
                    <div>today5</div>
                </div>
            </div>
            <div className='map'>
                map
            </div>
        </div>
    );
}

export default Main;
