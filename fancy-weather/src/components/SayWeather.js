import React from "react";
import {useSelector} from "react-redux";



const SayWeather = () => {

    const weather = useSelector(state => state.weather);

    const  speak = () => {
        const message = new SpeechSynthesisUtterance();
        message.lang = "ru-RU";
        message.text = `Температура ${weather.temp} ощущается ${weather.feels_like} скорость ветра ${weather.wind_speed}`
        window.speechSynthesis.speak(message);
    }

    return (
        <button className='play' onClick={() => speak()}>
            &#9658;
        </button>
    )
}

export default SayWeather;
