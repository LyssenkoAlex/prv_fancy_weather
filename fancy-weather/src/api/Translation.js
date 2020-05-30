import { getYandexTranslateURL } from '../constraints/fetchUrl';

const getTranslation = async (config) => {
	const url = getYandexTranslateURL(config);
	const response = await fetch(url);
	return response.json();
};
export default getTranslation;
