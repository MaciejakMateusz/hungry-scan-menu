import {useSelector} from "react-redux";
import {getTranslation} from "../../locales/langUtils.ts";

export const WelcomeTextContainer = () => {
    const {menu} = useSelector<any, any>(state => state.main.getMenu);

    if (!menu) return null;

    return (
        <div className={'welcome-text-container'}>
            <span>{getTranslation(menu.message)}</span>
        </div>
    );
}