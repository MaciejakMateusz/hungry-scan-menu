import {formatPrice} from "../../../utils";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";

export const PriceFooter = () => {
    const {t} = useTranslation();
    const {menuItem} = useSelector<any, any>(state => state.dishesCategories.view);

    return (
        <div className={'details-fixed-footer'}>
            <div className={'details-price-label'}>
                        <span className={'details-price-text'}>
                            {t('price')} &nbsp; &#x2022; &nbsp; {formatPrice(menuItem.price)} zł
                        </span>
            </div>
        </div>
    );
}