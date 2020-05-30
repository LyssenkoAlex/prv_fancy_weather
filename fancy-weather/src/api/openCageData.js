import { getLocationURL } from '../constraints/fetchUrl';

const getOpenCage = async (city) => {
	const response = await fetch(getLocationURL(city));
	return response.json();
};

export default getOpenCage;
