import {LocalizationIcon} from "../icons/LocalizationIcon.js";
import {LanguageSwitcher} from "../../locales/LanguageSwitcher.tsx";

export const LocalizationContainer = () => {
    return (
        <div className={'localization-container'}>
            <span className={'flex-centered'}><LocalizationIcon/>Dom Retro Pivnica</span>
            <LanguageSwitcher/>
        </div>
    );
}