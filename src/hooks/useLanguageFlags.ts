import type {Language} from "../interfaces/Language.ts";
import {useSelector} from "react-redux";
import type {RootState} from "../store/store.ts";

export const useLanguageFlags = (): Language[] => {
    const supportedLanguages =
        useSelector<RootState, string[]>(state => state.main.view.supportedLanguages);
    const restaurantDefaultLanguage =
        useSelector<RootState, string>(state => state.main.view.restaurantDefaultLanguage);
    const allLanguages: Language[] = [
        {id: 'PL', path: '/theme/icons/flags/pl-large.svg'},
        {id: 'EN', path: '/theme/icons/flags/en-large.svg'},
        {id: 'DE', path: '/theme/icons/flags/de-large.svg'},
        {id: 'FR', path: '/theme/icons/flags/fr-large.svg'},
        {id: 'ES', path: '/theme/icons/flags/es-large.svg'},
        {id: 'UK', path: '/theme/icons/flags/uk-large.svg'}
    ];

    const filterLanguages = (id: string): boolean => {
        return id === restaurantDefaultLanguage || supportedLanguages?.includes(id);
    }

    return allLanguages.filter(({id}: Language) => filterLanguages(id));
}