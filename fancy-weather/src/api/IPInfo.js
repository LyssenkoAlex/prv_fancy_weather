
import { getUserLocationCoordinates } from '../constraints/fetchUrl';

export const getLocation = async () => {
    const url = getUserLocationCoordinates();
    const response = await fetch(url);
    return response.json();
};
