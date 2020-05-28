
import {getFlickerImage} from '../constraints/fetchUrl';
import errorImage from '../assets/weather_icons/Weather_04.jpg'

export const getImages = async (config) => {
    try {
        const fImage = getFlickerImage(config);
        const response = await fetch(fImage);
        const photos = await response.json();
        return  photos.photos.photo.filter((e) => e.url_h !== undefined);
    }
    catch (e) {
        console.log('error catch')
        return {urls:{regular:errorImage}}
    }
};
