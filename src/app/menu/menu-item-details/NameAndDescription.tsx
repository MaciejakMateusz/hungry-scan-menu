import {getTranslation} from "../../../locales/langUtils";
import {useSelector} from "react-redux";
import {Labels} from "./Labels.js";

export const NameAndDescription = () => {
    const {menuItem} = useSelector<any, any>(state => state.dishesCategories.view);
    const hasBanner = menuItem.bestseller || menuItem.new;

    return (
        <>
            <div className={`details-name ${!hasBanner ? 'no-banner' : ''}`}>
                {getTranslation(menuItem.name)}
                <Labels/>
            </div>
            <div className={'details-description'}>
                {getTranslation(menuItem.description)}
            </div>
        </>
    );
}