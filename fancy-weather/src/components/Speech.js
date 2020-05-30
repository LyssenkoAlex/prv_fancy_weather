import * as React from "react";
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getOpenCage} from "../api/openCageData";
import {changeLocation} from "../state/Actions";
import {Recognizer} from '../api/Recognizer'


//------------------------SPEECH RECOGNITION-----------------------------


//------------------------COMPONENT-----------------------------

const Speech = () => {
    const language = useSelector(state => state.language);
    const [listening, setListening] = useState(false)
    const [recognizer] = useState(new Recognizer())
    const [speech, setSpeech] = useState('RECORDING OFF')
    const [location, setLocation] = useState(null)
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
            if(location !== null) {
                let cageData = await getOpenCage(location)
                console.log('cageData', cageData);
                dispatch(changeLocation({
                    name: cageData.results[0].formatted,
                    lat: cageData.results[0].geometry.lat,
                    lng: cageData.results[0].geometry.lng,
                }))
            }
        }
        updateWeather();
    }, [location]);


    return (
        <div className='voice_search'>
            <button id='microphone-btn' onClick={() => toggleListen()}><span
                className={listening ? 'mic_on' : 'mic_off'}>&#127908;</span></button>
            {/*<div id='interim'/>*/}
            <div id='final'>{location === null ? speech : location}</div>
            {/*<div id='final'>{speech}</div>*/}
        </div>
    )
}

export default Speech





