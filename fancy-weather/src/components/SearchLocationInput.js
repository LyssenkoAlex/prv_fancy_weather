import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {changeLanguage, changeLocation, changeUnits, recalculateTemp, weatherForecast} from '../state/Actions';
import {LANGUAGE, UNIT} from "../constraints/unitls";
import {getTranslation} from "../api/Translation";

let autoComplete;
const SearchLocationInput = () => {

    const [query, setQuery] = useState("");
    const autoCompleteRef = useRef(null);
    const dispatch = useDispatch();
    const unit = useSelector(state => state.unit);
    const language = useSelector(state => state.language);
    const weather = useSelector(state => state.weather);
    const location = useSelector(state => state.location);

    const loadScript = (url, callback) => {
        let script = document.createElement("script");
        script.type = "text/javascript";

        if (script.readyState) {
            script.onreadystatechange = function () {
                if (script.readyState === "loaded" || script.readyState === "complete") {
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else {
            script.onload = () => callback();
        }

        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    };

    const handleScriptLoad = (updateQuery, autoCompleteRef) => {
        autoComplete = new window.google.maps.places.Autocomplete(
            autoCompleteRef.current,
            {types: ["(cities)"]}
        );
        autoComplete.setFields(["address_components", "formatted_address", "geometry", "name"]);
        autoComplete.addListener("place_changed", () =>
            handlePlaceSelect(updateQuery)
        );
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }


    const handlePlaceSelect = (updateQuery) => {

        const addressObject = autoComplete.getPlace();
        const query = addressObject.formatted_address;
        updateQuery(query);
        console.log('addressObject', addressObject);
        dispatch(changeLocation({
            name: addressObject.name,
            lat: addressObject.geometry.location.lat(),
            lng: addressObject.geometry.location.lng()
        }))
    }

    const handleClick = () => {
        unit.NAME === UNIT.IMPERIAL.NAME ? dispatch(changeUnits(UNIT.METRIC)) : dispatch(changeUnits(UNIT.IMPERIAL));
        dispatch(recalculateTemp(unit));

    }

    const handleLanguageButton = async (e) => {
        let h = await getTranslation({text:weather.description, from_lang:language.VALUE, to_lang:e.VALUE});
        console.log('h: ', h)
        weather.description = h.text[0];
        dispatch(changeLanguage(e));
        dispatch(weatherForecast(weather))

    }


    useEffect(() => {
        loadScript(
            `https://maps.googleapis.com/maps/api/js?key=AIzaSyDLtbR-1ej--aUKizSNcgJJYIKz_KuSUNA&libraries=places`,
            () => handleScriptLoad(setQuery, autoCompleteRef)
        );
    }, []);

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <div className='input_wrapper'>
                <input
                    ref={autoCompleteRef}
                    onChange={event => setQuery(event.target.value)}
                    placeholder={location.name}
                    value={query}
                />
                <div className='menu_wrapper'>
                    <button onClick={() => handleClick()}>
                        <span className={unit.NAME === UNIT.IMPERIAL.NAME ? '' : 'selected_unit'}>C°</span>
                        - <span className={unit.NAME === UNIT.IMPERIAL.NAME ? 'selected_unit' : ''}>F°</span>
                    </button>
                    <button onClick={() => handleLanguageButton(LANGUAGE.RU)}>
                        <span className={language.TITLE === LANGUAGE.RU.TITLE ? 'selected_unit' : ''}>{LANGUAGE.RU.TITLE}</span>
                    </button>
                    <button onClick={() => handleLanguageButton(LANGUAGE.ENG)}>
                        <span className={language.TITLE === LANGUAGE.ENG.TITLE ? 'selected_unit' : ''}>{LANGUAGE.ENG.TITLE}</span>
                    </button>
                    <button onClick={() => handleLanguageButton(LANGUAGE.KAZ)}>
                        <span className={language.TITLE === LANGUAGE.KAZ.TITLE ? 'selected_unit' : ''}>{LANGUAGE.KAZ.TITLE}</span>
                    </button>
                </div>
            </div>
        </form>
    );
}

export default SearchLocationInput;
