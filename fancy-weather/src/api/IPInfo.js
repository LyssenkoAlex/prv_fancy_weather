
import { getUserLocationCoordinates } from '../constraints/fetchUrl';

export const getLocation = async (config) => {
    const url = getUserLocationCoordinates(config);
    console.log('weather url', url);
    const response = await fetch(url);
    return response.json();
};
