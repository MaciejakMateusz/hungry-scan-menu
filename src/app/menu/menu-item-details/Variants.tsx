import {getTranslation} from "../../../locales/langUtils";
import {formatPrice} from "../../../utils";
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import type {Variant} from "../../../interfaces/Variant.ts";

export const Variants = () => {
    const {variants} = useSelector<any, any>(state => state.dishesCategories.getVariants);
    const {menuItem} = useSelector<any, any>(state => state.dishesCategories.view);
    const {t} = useTranslation();

    if (variants.length === 0) {
        return <></>;
    }

    return (
        <>
            <div className={'details-definition-text'}>{t('variants')}:</div>
            <div className={'details-list-positions-wrapper'}>
                {variants.map((variant: Variant) => (
                    <div key={variant.id} className={'details-list-position-container'}>
                        <span className={'details-list-position-text'}>{getTranslation(variant.name)}</span>
                        <span
                            className={'details-list-position-price'}>{formatPrice(variant.price + menuItem?.price)} zł</span>
                    </div>
                ))}
            </div>
        </>
    );
}