import {LocalizationIcon} from "../icons/LocalizationIcon.js";
import {LanguageSwitcher} from "../../locales/LanguageSwitcher.tsx";
import {useSelector} from "react-redux";

export const LocalizationContainer = () => {
    const {menu} = useSelector<any, any>(state => state.main.getMenu);

    return (
        <div className={'localization-container'}>
            <span className={'flex-centered'}>
                <LocalizationIcon themeColor={menu?.theme}/>
                {menu?.restaurant.name}
            </span>
            <LanguageSwitcher/>
        </div>
    );
}