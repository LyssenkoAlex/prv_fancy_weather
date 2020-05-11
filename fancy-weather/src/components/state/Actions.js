export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE';


export function changeLanguage(langCode) {
    return {type:CHANGE_LANGUAGE, langCode}
}
