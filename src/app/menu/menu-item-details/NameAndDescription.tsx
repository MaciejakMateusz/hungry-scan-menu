import {getTranslation} from "../../../locales/langUtils";
import {useSelector} from "react-redux";
import {Tooltip} from "./Tooltip.tsx";
import {ReactSVG} from "react-svg";
import {Allergens} from "./Allergens.tsx";

export const NameAndDescription = () => {
    const {menuItem} = useSelector<any, any>(state => state.dishesCategories.view);
    const hasBanner = menuItem.bestseller || menuItem.new;
    const hasNoAllergens = !menuItem.allergens || menuItem.allergens.length === 0;
    const info = document.getElementById('info-icon');

    const renderTooltip = () => {
        if (hasNoAllergens) return null;
        return (
            <Tooltip content={<Allergens/>} appendTo={info || undefined}>
                <div className={'inline-block'}>
                    <ReactSVG src={'/theme/icons/info.svg'} id={'info-icon'} className={'info-icon'}/>
                </div>
            </Tooltip>
        );
    }

    return (
        <>
            <div className={`details-name ${!hasBanner ? 'no-banner' : ''}`}>
                <span>
                    {getTranslation(menuItem.name)}
                    {renderTooltip()}
                </span>
            </div>
            <div className={'details-description'}>
                {getTranslation(menuItem.description)}
            </div>
        </>
    );
}