import type {Language} from "../interfaces/Language.ts";

export const useLanguageFlags = (): Language[] => {
    return [
        {id: 'PL', path: '/theme/icons/flags/pl-large.svg'},
        {id: 'EN', path: '/theme/icons/flags/en-large.svg'},
        {id: 'DE', path: '/theme/icons/flags/de-large.svg'},
        {id: 'FR', path: '/theme/icons/flags/fr-large.svg'},
        {id: 'ES', path: '/theme/icons/flags/es-large.svg'},
        {id: 'UK', path: '/theme/icons/flags/uk-large.svg'},
    ];
}