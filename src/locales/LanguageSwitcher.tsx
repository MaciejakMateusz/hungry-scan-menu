import {ReactSVG} from "react-svg";
import {useState} from "react";
import {useTranslation} from "react-i18next";
import {getLanguage} from "./langUtils.ts";
import {useLanguageFlags} from "../hooks/useLanguageFlags.ts";
import type {Language} from "../interfaces/Language.ts";

export const LanguageSwitcher = () => {
    const {i18n} = useTranslation();
    const activeLng: string = getLanguage() || 'pl-PL';
    const languages: Language[] = useLanguageFlags();
    const [isDisplayed, setIsDisplayed] = useState(false);

    const formatToUppercase = (lng: string) => {
        if (lng === 'pl-PL') {
            return 'PL';
        }
        return lng.toUpperCase();
    }

    const formatToLowercase = (lng: string) => {
        if (lng === 'pl-PL') {
            return 'pl';
        }
        return lng.toLowerCase();
    }

    const switchLanguage = (lng: string) => {
        i18n.changeLanguage(lng.toLowerCase());
        document.cookie = `i18next=${lng.toLowerCase()}; path=/`;
        setIsDisplayed(false);
    }

    const renderDialog = () => {
        if(!isDisplayed) return (<></>);
        return (
            <div className={'dialog-mask'} onClick={() => setIsDisplayed(false)}>
                <div className={'lng-switcher-dialog'}>
                    {languages.filter(l => l.id !== formatToUppercase(activeLng)).map(l => (
                        <div className={'lng'}
                             onClick={(e) => {
                                 e.stopPropagation();
                                 switchLanguage(l.id);
                             }}
                             key={l.id}>
                            <ReactSVG src={l.path} className={'flag-icon'}/>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <>
            <div className={'non-selectable'}>
                <div className={'lang-switcher'} onClick={() => setIsDisplayed(!isDisplayed)}>
                <span className={'lang-mobile-wrapper'}>
                    <span className={'lng-display'}>
                        <ReactSVG src={`/theme/icons/flags/${formatToLowercase(activeLng)}-small.svg`} className={'flag-icon'}/>
                    </span>
                    <ReactSVG src={'/theme/icons/chevron-down.svg'}/>
                </span>
                </div>
            </div>
            {renderDialog()}
        </>
    );
}