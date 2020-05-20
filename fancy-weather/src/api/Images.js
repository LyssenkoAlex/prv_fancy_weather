
import { getImageByCityURL } from '../constraints/fetchUrl';

export const getImages = async (config) => {

    const url = getImageByCityURL(config);
    console.log('translation url', url);
    const response = await fetch(url);
    return response.json();
};
