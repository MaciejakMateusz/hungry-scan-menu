import {useSelector} from "react-redux";
import {getTranslation} from "../../locales/langUtils.ts";
import {useTranslation} from "react-i18next";
import {useParams} from "react-router-dom";

export const WelcomeTextContainer = () => {
    const {menu} = useSelector<any, any>(state => state.main.getMenu);
    const {message} = useParams();
    useTranslation();

    if (!menu) return null;

    return (
        <div className={'welcome-text-container'}>
            <span>{message ? message : getTranslation(menu.message)}</span>
        </div>
    );
}