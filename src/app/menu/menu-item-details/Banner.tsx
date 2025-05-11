import {useTranslation} from "react-i18next";
import type {MenuItem} from "../../../interfaces/MenuItem.ts";

type BannerType = {
    detailMode?: boolean | null;
    menuItem: MenuItem;
}

export const Banner = ({detailMode, menuItem}: BannerType) => {
    const {t} = useTranslation();
    const imgName = menuItem.imageName;

    if (menuItem?.bestseller) {
        return (<span className={detailMode ? `details-banner ${!imgName ? 'no-image' : ''}` : 'menu-item-banner'}>{t('bestseller')}</span>);
    } else if (menuItem?.new) {
        return (<span className={detailMode ? `details-banner ${!imgName ? 'no-image' : ''}` : 'menu-item-banner'}>{t('new')}</span>);
    }
}