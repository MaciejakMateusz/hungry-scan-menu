import {setMenuItem} from "../../../slices/mainSlice.ts";
import {MenuItemImage} from "./MenuItemImage.tsx";
import {MenuItemContent} from "./MenuItemContent.tsx";
import type {MenuItem} from "../../../interfaces/MenuItem.ts";
import {useAppDispatch} from "../../../hooks/hooks.ts";
import {useImageExists} from "../../../hooks/useImageExists.ts";
import {Banner} from "./Banner.tsx";
import {useTranslation} from "react-i18next";

type MenuItemPositionType = {
    menuItem: MenuItem
}

export const MenuItemPosition = ({menuItem}: MenuItemPositionType) => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    const hasImage = useImageExists(menuItem.id);
    const banners = menuItem.banners?.filter(banner => banner.id !== 'promo');

    return (
        <div className={'menu-item-container'}
             onClick={() => dispatch(setMenuItem(menuItem))}>
            <div className={'banner-wrapper'}>
                {banners?.map(banner => (
                    <Banner key={banner.id}
                            name={t(banner.id)}
                            iconPath={`/theme/icons/${banner.id}-small.svg`}
                            bigFont={false}/>
                ))}
            </div>
            <div className={`menu-item-grid ${!hasImage ? 'no-photo' : ''}`}>
                <MenuItemImage menuItem={menuItem} hasImage={hasImage}/>
                <MenuItemContent menuItem={menuItem} hasImage={hasImage}/>
            </div>
        </div>
    );
}