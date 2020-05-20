import React, {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import mapboxgl from 'mapbox-gl';
import "mapbox-gl/dist/mapbox-gl.css";
import {MAP_BOX_KEY} from "../constraints/fetchUrl";


const styles = {
    width: "100%",
    height: "100%",
    // height: "calc(50vh - 80px)",
    // position: "absolute"
};

const Map = () => {
    const [map, setMap] = useState(null);
    const mapContainer = useRef(null);

    const location = useSelector(state => state.location);

    useEffect(() => {
        if(location.lat !== undefined) {
            console.log('MAP: ', location)
            console.log('center: ', map)
            mapboxgl.accessToken = MAP_BOX_KEY;
            const initializeMap = ({setMap, mapContainer}) => {
                console.log('start', location)
                const map = new mapboxgl.Map({
                    container: mapContainer.current,
                    style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
                    center: [location.lng, location.lat],
                    zoom: 13
                });

                map.on("load", () => {
                    setMap(map);
                    map.resize();
                });
            };
            // initializeMap({setMap, mapContainer})
            if (!map) initializeMap({setMap, mapContainer});
            if (!location) initializeMap({setMap, mapContainer});
        }

    }, [map, location]);

    return <div ref={el => (mapContainer.current = el)} style={styles}/>;
};


export default Map;
