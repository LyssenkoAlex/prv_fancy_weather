import {getLocationURL} from "../constraints/fetchUrl";

export const getOpenCage = async (city) => {
    const response = await fetch(getLocationURL(city));
    return response.json();
};

