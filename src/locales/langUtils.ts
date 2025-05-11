import i18n from "i18next";
import {getCookie} from "../utils";
import type {Translatable} from "../interfaces/Translatable.ts";

export const getTranslation = (obj: Translatable) => {
    const lngCookie = getCookie('lng')
    const currentLang = lngCookie ? lngCookie : i18n.language
    if(currentLang === 'en') {
        return obj.translationEn || obj.defaultTranslation
    }
    return obj.defaultTranslation
}