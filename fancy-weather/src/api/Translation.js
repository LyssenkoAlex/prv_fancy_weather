
import { getYandexTranslateURL } from '../constraints/fetchUrl';

export const getTranslation = async (config) => {
    const url = getYandexTranslateURL(config);
    console.log('translation url', url);
    const response = await fetch(url);
    return response.json();
};
