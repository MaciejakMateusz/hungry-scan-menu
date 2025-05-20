import {formatPrice} from "../../../utils";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";

export const PriceFooter = () => {
    const {t} = useTranslation();
    const {menuItem} = useSelector<any, any>(state => state.main.view);
    const {menu} = useSelector<any, any>(state => state.main.getMenu);

    return (
        <div className={'details-fixed-footer'}>
            <div className={'details-price-label'} style={{background: menu?.theme}}>
                        <span className={'details-price-text'}>
                            {t('price')} &nbsp; &#x2022; &nbsp; {formatPrice(menuItem.price)} zł
                        </span>
            </div>
        </div>
    );
}