import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {changeLocation} from '../state/Actions';

let autoComplete;
const SearchLocationInput = () => {
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
        autoComplete.setFields(["address_components", "formatted_address"]);
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
        console.log('formatted_address', addressObject.formatted_address);
        dispatch(changeLocation(addressObject.formatted_address))
    }


    const [query, setQuery] = useState("");
    const autoCompleteRef = useRef(null);
    const dispatch = useDispatch();
    const location = useSelector(state => state.location);


    const setLocation = (location) => {
        console.log('location', location)
        dispatch(changeLocation(location))
    };


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
            </div>
        </form>
    );
}

export default SearchLocationInput;
