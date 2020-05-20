
import { getYandexTranslateURL } from '../constraints/fetchUrl';

export const getTranslation = async (config) => {
    const url = getYandexTranslateURL(config);
    const response = await fetch(url);
    return response.json();
};
