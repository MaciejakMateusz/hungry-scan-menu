import {ReactSVG} from "react-svg";
import {useState} from "react";
import {getLanguage} from "../util/util.ts";
import {useTranslation} from "react-i18next";

type LanguageSwitcherMobileProps = {
    sideMenu?: boolean;
}

export const LanguageSwitcherMobile = ({sideMenu}: LanguageSwitcherMobileProps) => {
    const {i18n} = useTranslation();
    const activeLng = getLanguage() || 'pl-PL';
    const supported = ['PL', 'EN', 'NL'];
    const [isDropped, setIsDropped] = useState(false);

    const formatToUppercase = (lng: string) => {
        switch (lng) {
            case 'pl-PL':
                return 'PL';
            case 'pl':
                return 'PL';
            case 'en':
                return 'EN';
            case 'nl':
                return 'NL';
            default:
                return 'PL';
        }
    }

    const changeLanguageMobile = (lng: string) => {
        i18n.changeLanguage(lng.toLowerCase());
        document.cookie = `i18next=${lng.toLowerCase()}; path=/`;
        setIsDropped(false);
    }

    return (
        <div className={`lang-switcher-mobile-container non-selectable ${sideMenu ? 'side-menu' : ''}`}>
            <div className={'lang-switcher-mobile'} onClick={() => setIsDropped(!isDropped)}>
                <span className={'lang-switcher-mobile-wrapper'}>
                    <span className={`lng-mobile-display ${sideMenu ? 'side-menu' : ''}`}>{formatToUppercase(activeLng)}</span>
                    <ReactSVG src={'/drop-icon.svg'} className={`drop-icon ${isDropped && 'dropped'}`}/>
                </span>
                {isDropped && supported.filter(l => l !== formatToUppercase(activeLng)).map(l => (
                    <div className={`lng-mobile ${sideMenu ? 'side-menu' : ''}`}
                         onClick={(e) => {
                             e.stopPropagation();
                             changeLanguageMobile(l);
                         }}
                         key={l}>
                        {l}
                    </div>
                ))}
            </div>
        </div>
    );
}