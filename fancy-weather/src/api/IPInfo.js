import { getUserLocationCoordinates } from '../constraints/fetchUrl';

const getLocation = async () => {
	const url = getUserLocationCoordinates();
	const response = await fetch(url);
	return response.json();
};

export default getLocation;
