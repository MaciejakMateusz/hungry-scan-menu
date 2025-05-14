import {getTranslation} from "../../../locales/langUtils.ts";
import {formatPrice} from "../../../utils.ts";
import type {MenuItem} from "../../../interfaces/MenuItem.ts";
import {ReactSVG} from "react-svg";

type MenuItemContentType = {
    menuItem: MenuItem;
    hasImage: boolean | null;
}

export const MenuItemContent = ({menuItem, hasImage}: MenuItemContentType) => {
    const hasPromotion = menuItem.banners?.map(b => b.id).includes('promo');

    const renderPrice = () => {
        if (!hasPromotion) {
            return (
                <div className={'menu-item-price'}>{formatPrice(menuItem.price)} zł</div>
            );
        }
        return (
            <div className={'menu-item-price promo'}>
                <s className={'old-price'}>{formatPrice(menuItem.price)} zł</s>
                {formatPrice(menuItem.promoPrice)} zł
                <ReactSVG src={'/theme/icons/promo-small.svg'} className={'promo-icon'}/>
            </div>
        );
    }

    return (
        <div className={`menu-item-text-data-grid ${!hasImage ? 'no-photo' : ''}`}>
            <div className={'menu-item-name'}>{getTranslation(menuItem.name)}</div>
            <div className={'menu-item-description'}>{getTranslation(menuItem.description)}</div>
            {renderPrice()}
        </div>
    );
}