import {LocalizationIcon} from "../icons/LocalizationIcon.js";
import {LanguageSwitcher} from "../../locales/LanguageSwitcher.tsx";
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";

export const LocalizationContainer = () => {
    const {menu} = useSelector<any, any>(state => state.main.getMenu);
    const {theme} = useParams();

    return (
        <div className={'localization-container'}>
            <span className={'flex-centered'}>
                <LocalizationIcon themeColor={theme ? theme : menu?.theme}/>
                {menu?.restaurant.name}
            </span>
            <LanguageSwitcher/>
        </div>
    );
}