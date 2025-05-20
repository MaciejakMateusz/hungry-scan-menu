import type {Banner as BannerType} from "../../../interfaces/Banner.ts";
import {Banner} from "../menu-item/Banner.tsx";
import {Labels} from "./Labels.tsx";
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

export const BannersLabelsTopper = () => {
    const {t} = useTranslation();
    const {menuItem} = useSelector<any, any>(state => state.main.view);
    const banners = menuItem.banners?.filter((banner: BannerType) => banner.id !== 'promo');
    const shouldNotRender = (!banners || banners.length === 0) && (!menuItem?.labels || menuItem.labels.length === 0);

    if (shouldNotRender) {
        return null;
    }

    return (
        <div className={'details-header'}>
            <div className={'banner-wrapper-detail'}>
                {banners?.map((banner: BannerType) => (
                    <Banner key={banner.id} name={t(banner.id)} iconPath={`/theme/icons/${banner.id}-small.svg`}/>
                ))}
            </div>
            <Labels/>
        </div>
    );
}