import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {changeLocation, changeUnits, recalculateTemp} from '../state/Actions';
import {LANGUAGE, UNIT} from "../constraints/unitls";

let autoComplete;
const SearchLocationInput = () => {

    const [query, setQuery] = useState("");
    const autoCompleteRef = useRef(null);
    const dispatch = useDispatch();
    const unit = useSelector(state => state.unit);

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
        console.log('formatted_address lng', addressObject.geometry.location.lat());
        console.log('formatted_address lat', addressObject.geometry.location.lng());
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
                    placeholder="Enter a City"
                    value={query}
                />
                <div className='menu_wrapper'>
                    <button onClick={() => handleClick()}>
                        <span className={unit.NAME === UNIT.IMPERIAL.NAME ? '' : 'selected_unit'}>C°</span>
                        - <span className={unit.NAME === UNIT.IMPERIAL.NAME ? 'selected_unit' : ''}>F°</span>
                    </button>
                    <button>
                        <span>{LANGUAGE.RU.TITLE}</span>
                    </button>
                    <button>
                        <span>{LANGUAGE.ENG.TITLE}</span>
                    </button>
                    <button>
                        <span>{LANGUAGE.KAZ.TITLE}</span>
                    </button>
                </div>
            </div>
        </form>
    );
}

export default SearchLocationInput;
