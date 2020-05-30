import React from "react";
import {useDispatch, useSelector} from 'react-redux';
import {changeLanguage, changeUnits, recalculateTemp, weatherForecast} from '../state/Actions';
import {LANGUAGE, UNIT, updateBackgroundImage} from "../constraints/unitls";
import {getTranslation} from "../api/Translation";
import Time from "./Time";
import Speech from "./Speech";


const WeatherMenu = () => {

    const dispatch = useDispatch();
    const unit = useSelector(state => state.unit);
    const language = useSelector(state => state.language);
    const weather = useSelector(state => state.weather);
    const images = useSelector(state => state.photoUrl);

    const handleClick = () => {
        unit.NAME === UNIT.IMPERIAL.NAME ? dispatch(changeUnits(UNIT.METRIC)) : dispatch(changeUnits(UNIT.IMPERIAL));
        dispatch(recalculateTemp(unit));
    }

    const handleLanguageButton = async (e) => {
        let h = await getTranslation({text: weather.description, from_lang: language.VALUE, to_lang: e.VALUE});
        weather.description = h.text[0];
        dispatch(changeLanguage(e));
        dispatch(weatherForecast(weather))
    }

    const handleImageButton = async (e) => {
        updateBackgroundImage(images[Math.floor(Math.random() * Math.floor(images.length))].url_h)
    }

    return (

        <div className='menu_wrapper'>
            <div className='timeContainer'>
                <Time/>
            </div>
            <button onClick={() => handleClick()}>
                <span className={unit.NAME === UNIT.IMPERIAL.NAME ? '' : 'selected_unit'}>C°</span>
                - <span className={unit.NAME === UNIT.IMPERIAL.NAME ? 'selected_unit' : ''}>F°</span>
            </button>
            <button onClick={() => handleLanguageButton(LANGUAGE.RU)}>
                <span className={language.TITLE === LANGUAGE.RU.TITLE ? 'selected_unit' : ''}>{LANGUAGE.RU.TITLE}</span>
            </button>
            <button onClick={() => handleLanguageButton(LANGUAGE.ENG)}>
                <span
                    className={language.TITLE === LANGUAGE.ENG.TITLE ? 'selected_unit' : ''}>{LANGUAGE.ENG.TITLE}</span>
            </button>
            <button onClick={() => handleLanguageButton(LANGUAGE.KAZ)}>
                <span
                    className={language.TITLE === LANGUAGE.KAZ.TITLE ? 'selected_unit' : ''}>{LANGUAGE.KAZ.TITLE}</span>
            </button>
            <button onClick={() => handleImageButton(LANGUAGE.KAZ)}>
                <span>&#x21BB;</span>
            </button>
                <Speech/>
        </div>
    );

}


export default WeatherMenu;
