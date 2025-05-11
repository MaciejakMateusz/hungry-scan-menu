import {getTranslation} from "../../locales/langUtils";
import {formatPrice} from "../../utils";
import type {MenuItem} from "../../interfaces/MenuItem.ts";

type MenuItemContentType = {
    menuItem: MenuItem;
}

export const MenuItemContent = ({menuItem}: MenuItemContentType) => {
    return (
        <div className={`menu-item-text-data-grid ${!menuItem.imageName ? 'no-photo' : ''}`}>
            <div className={'menu-item-name'}>{getTranslation(menuItem.name)}</div>
            <div className={'menu-item-description'}>{getTranslation(menuItem.description)}</div>
            <div className={'menu-item-price'}>{formatPrice(menuItem.price)} zł</div>
        </div>
    );
}