/* eslint-disable react/jsx-filename-extension,react/jsx-indent */
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import mapboxgl from 'mapbox-gl';
import { MAP_BOX_KEY } from '../constraints/fetchUrl';

const styles = {
	width: '100%',
	height: '100%'
};

const Map = () => {
	const [map, setMap] = useState(null);
	const mapContainer = useRef(null);
	const prevLocationRef = useRef();
	const location = useSelector((state) => state.location);

	useEffect(() => {
		if (location.lat !== undefined) {
			mapboxgl.accessToken = MAP_BOX_KEY;
			const initializeMap = ({ setMap, mapContainer }) => {
				const map = new mapboxgl.Map({
					container: mapContainer.current,
					style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
					center: [location.lng, location.lat],
					zoom: 13
				});

				map.on('load', () => {
					setMap(map);
					map.resize();
				});
			};
			if (!map) initializeMap({ setMap, mapContainer });
			if (location !== prevLocationRef.current) {
				initializeMap({ setMap, mapContainer });
				prevLocationRef.current = location;
			}
		}
	}, [map, location]);

	return <div ref={(el) => (mapContainer.current = el)} style={styles} />;
};

export default Map;
