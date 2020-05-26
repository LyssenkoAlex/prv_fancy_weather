
import { getImageByCityURL } from '../constraints/fetchUrl';
import errorImage from '../assets/weather_icons/Weather_04.jpg'

export const getImages = async (config) => {
    try {
        const url = getImageByCityURL(config);
        const response = await fetch(url);
        return response.json();
    }
    catch (e) {
        console.log('error catch')
        return {urls:{regular:errorImage}}
    }
};
