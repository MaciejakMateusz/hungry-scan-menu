import {useTranslation} from 'react-i18next';

export const LanguageSwitcher = () => {
    const {i18n} = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        document.cookie = `i18next=${lng}`;
    };

    return (
        <div className={'onboarding-lang-switcher'}>
            <button onClick={() => changeLanguage('en')}>English</button>
            <button onClick={() => changeLanguage('pl')}>Polski</button>
        </div>
    );
};