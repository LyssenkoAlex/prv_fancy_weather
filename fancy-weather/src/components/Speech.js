import * as React from "react";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getOpenCage} from "../api/openCageData";
import {changeLocation} from "../state/Actions";
import {Recognizer} from '../api/Recognizer'
import {VOICE_COMMANDS} from "../constraints/unitls";
import {sayText} from "../api/SayWeather";



const Speech = () => {
    const [listening, setListening] = useState(false)
    const [recognizer] = useState(new Recognizer())
    const [speech, setSpeech] = useState('RECORDING OFF')
    const [location, setLocation] = useState(null)
    const weather = useSelector(state => state.weather);
    const dispatch = useDispatch();

    const toggleListen = () => {
        if (!recognizer.isRecognizing) {
            setListening(true)
            setSpeech('START TALK')
            start();
        } else {
            setListening(false)
            setSpeech('RECORDING OFF')
            stop();
        }
    }

    const start = () => {
        recognizer.start(setLocation);
        setSpeech('RECORDING STARTED')
    }

    const stop = () => {
        recognizer.stop();
        setSpeech('RECORDING STOPPED')
    }

    useEffect(() => {

        async function updateWeather() {
            if (location !== null && location.toUpperCase() !== VOICE_COMMANDS.SAY_WEATHER.VALUE.toUpperCase()) {
                let cageData = await getOpenCage(location)
                if (cageData.results !== undefined && cageData.results.length > 0) {
                    dispatch(changeLocation({
                        name: cageData.results[0].formatted,
                        lat: cageData.results[0].geometry.lat,
                        lng: cageData.results[0].geometry.lng,
                    }))
                }
            } else if (location !== null && location.toUpperCase() === VOICE_COMMANDS.SAY_WEATHER.VALUE.toUpperCase()) {
                setListening(false)
                setSpeech('RECORDING OFF')
                stop();
                const lang = "ru-RU";
                const text = `Температура ${weather.temp} ощущается ${weather.feels_like} скорость ветра ${weather.wind_speed}`
                sayText(text, lang)
            }
        }

        updateWeather();
    }, [location]);

    const speak = () => {
        setListening(false)
        setSpeech('RECORDING OFF')
        stop();
        const lang = "ru-RU";
        const text = `Температура ${weather.temp} ощущается ${weather.feels_like} скорость ветра ${weather.wind_speed}`
        sayText(text, lang)
    }


    return (
        <div className='voice_search timeContainer'>
            <button id='microphone-btn' onClick={() => toggleListen()}><span
                className={listening ? 'mic_on' : 'mic_off'}>&#127908;</span></button>
            <div id='final'>{location === null ? speech : location}</div>
            <button className='play' onClick={() => speak()}>
                <span>&#9658;</span>
            </button>
        </div>

    )
}

export default Speech





