import {getTranslation} from "../../../locales/langUtils";
import {useSelector} from "react-redux";
import {Tooltip} from "./Tooltip.tsx";
import {ReactSVG} from "react-svg";
import {Allergens} from "./Allergens.tsx";
import type {Banner as BannerType} from "../../../interfaces/Banner.ts";

export const NameAndDescription = () => {
    const {menuItem} = useSelector<any, any>(state => state.main.view);
    const hasBanners = menuItem.banners
        ?.filter((banner: BannerType) => banner.id !== 'promo').length > 0;
    const hasLabels = menuItem.labels?.length > 0;
    const hasAllergens = menuItem.allergens?.length > 0;
    const info = document.getElementById('info-icon');

    const renderTooltip = () => {
        if (!hasAllergens) return null;
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
            <div className={'details-name'} style={hasBanners || hasLabels ? {marginTop: '15px'} : {}}>
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