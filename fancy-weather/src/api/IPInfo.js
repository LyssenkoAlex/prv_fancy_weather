
import { getUserLocationCoordinates } from '../constraints/fetchUrl';

export const getLocation = async () => {
    const url = getUserLocationCoordinates();
    console.log('location url', url);
    const response = await fetch(url);
    return response.json();
};
