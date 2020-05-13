import React, {useState, useEffect, useRef} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import MagnifyIcon from "mdi-react/MagnifyIcon";
import {getUserLocationCoordinates} from "../constraints/fetchUrl";
import {getLocation} from "../api/IPInfo";


const Main = () => {

    const inputRef = useRef()
    const [city, setCity] = useState('Almaty');


    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log('handleSubmit: ', this.locationInput.value)
        setCity(e)
    }

    const handleChange = (e) => {
        console.log('handleChange', e)
    }

    const handleFocus = (e) => {
        console.log('handleFocus: ', e)
    }
    useEffect(() => {


        setTimeout(() => {
            let location = getLocation();
            console.log('locationB', inputRef.current.value)
            console.log('locationC', location.city)
        }, 600)


    }, [city, inputRef]);

    return (
        <div className='wrapper'>
            <div className='sunny info_card'>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className='input_wrapper'>
                        <MagnifyIcon size={60}/>
                        <input
                            defaultValue={city}
                            type='text'
                            onFocus={(e) => handleFocus(e)}
                            onChange={(e) => setCity(e.target.value)}
                            ref={inputRef}
                            required
                        />
                        <input type="text" name="city" list="cityname"/>
                            <datalist id="cityname">
                                <option value="Boston"/>
                                    <option value="Cambridge"/>
                            </datalist>

                    </div>
                </form>
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
                    <div>today1</div>
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
