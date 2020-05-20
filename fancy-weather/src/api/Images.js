
import { getImageByCityURL } from '../constraints/fetchUrl';

export const getImages = async (config) => {

    const url = getImageByCityURL(config);
    const response = await fetch(url);
    return response.json();
};
