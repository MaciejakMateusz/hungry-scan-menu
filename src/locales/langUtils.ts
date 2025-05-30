import i18n from "i18next";
import {getCookie} from "../utils";
import type {Translatable} from "../interfaces/Translatable.ts";

export const getTranslation = (obj: Translatable) => {
    const lngCookie = getCookie('lng')
    const currentLang = lngCookie ? lngCookie : i18n.language
    switch (currentLang) {
        case 'pl': return obj.pl;
        case 'pl-PL': return obj.pl;
        case 'en': return obj.en ? obj.en : obj.pl;
        case 'fr': return obj.fr ? obj.fr : obj.pl;
        case 'de': return obj.de ? obj.de : obj.pl;
        case 'es': return obj.es ? obj.es : obj.pl;
        case 'uk': return obj.uk ? obj.uk : obj.pl;
        default: return '';
    }
}

export const getLanguage = () => {
    return i18n?.language ? i18n.language : getCookie('i18next');
}