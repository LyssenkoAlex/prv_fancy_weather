import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import MagnifyIcon from "mdi-react/MagnifyIcon";



const Main = () => {
    const language = useSelector(state => state.language);
    const city = useSelector(state => state.city);
    const handleSubmit = (e) => {
        console.log('handleSubmit: ', e)
    }

    const handleChange = (e) => {
        console.log('handleChange', e)
    }

    const handleFocus = (e) => {
        console.log('handleFocus: ', e)
    }

    return (
        <div className='sunny info_card'>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className='input_wrapper'>
               <MagnifyIcon size={60}/>
                <input defaultValue={city} type='text' onFocus={(e) => handleFocus(e)} onChange={(e) => handleChange(e)}/>
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
    );
}

export default Main;
