import {LanguageSwitcher} from "../../locales/LanguageSwitcher.tsx";
import {useSelector} from "react-redux";

export const LocalizationContainer = () => {
    const {menu} = useSelector<any, any>(state => state.main.getMenu);

    return (
        <div className={'localization-container'}>
            <span className={'flex-centered'}>
                {menu?.restaurant.name}
            </span>
            <LanguageSwitcher/>
        </div>
    );
}