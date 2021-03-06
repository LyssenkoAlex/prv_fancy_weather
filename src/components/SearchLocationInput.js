/* eslint-disable react/jsx-filename-extension,react/jsx-indent,react/jsx-indent-props */
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeLocation } from '../state/Actions';
import WeatherMenu from './WeatherMenu';

let autoComplete;
const SearchLocationInput = () => {
	const [query, setQuery] = useState('');
	const autoCompleteRef = useRef(null);
	const dispatch = useDispatch();
	const location = useSelector((state) => state.location);

	const loadScript = (url, callback) => {
		const script = document.createElement('script');
		script.type = 'text/javascript';

		if (script.readyState) {
			script.onreadystatechange = function () {
				if (script.readyState === 'loaded' || script.readyState === 'complete') {
					script.onreadystatechange = null;
					callback();
				}
			};
		} else {
			script.onload = () => callback();
		}

		script.src = url;
		document.getElementsByTagName('head')[0].appendChild(script);
	};

	const handleScriptLoad = (updateQuery, autoCompleteRef) => {
		autoComplete = new window.google.maps.places.Autocomplete(autoCompleteRef.current, { types: ['(cities)'] });
		autoComplete.setFields(['address_components', 'formatted_address', 'geometry', 'name']);
		autoComplete.addListener('place_changed', () => handlePlaceSelect(updateQuery));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	const handlePlaceSelect = (updateQuery) => {
		const addressObject = autoComplete.getPlace();
		const query = addressObject.formatted_address;
		updateQuery(query);
		dispatch(
			changeLocation({
				name: addressObject.name,
				lat: addressObject.geometry.location.lat(),
				lng: addressObject.geometry.location.lng()
			})
		);
	};

	useEffect(() => {
		loadScript(`https://maps.googleapis.com/maps/api/js?key=AIzaSyDLtbR-1ej--aUKizSNcgJJYIKz_KuSUNA&libraries=places`, () =>
			handleScriptLoad(setQuery, autoCompleteRef)
		);
	}, []);

	return (
		<form onSubmit={(e) => handleSubmit(e)}>
			<div className="input_wrapper">
				<div className="search_container">
					<div className="menu_wrapper timeContainer">
						<input
							ref={autoCompleteRef}
							onChange={(event) => setQuery(event.target.value)}
							placeholder={location.name}
							value={query}
							id="idInputLocation"
						/>
					</div>
					<div className="menu_wrapper timeContainer">
						<span>
							Lat:
							{Number.parseInt(location.lat).toFixed(2)}
						</span>
						<span>
							&nbsp;Lng:
							{Number.parseInt(location.lng).toFixed(2)}
						</span>
					</div>
				</div>
				<WeatherMenu />
			</div>
		</form>
	);
};

export default SearchLocationInput;
