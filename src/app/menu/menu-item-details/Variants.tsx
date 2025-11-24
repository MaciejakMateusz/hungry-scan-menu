import {getTranslation} from "../../../locales/langUtils";
import {formatPrice} from "../../../utils";
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import type {Variant} from "../../../interfaces/Variant.ts";
import {MenuItemDetailsPosition} from "./MenuItemDetailsPosition.tsx";

export const Variants = () => {
    const {t} = useTranslation();
    const {menuItem} = useSelector<any, any>(state => state.main.view);
    const variants = menuItem?.variants
        ?.filter((v: Variant) => v.available)
        .sort((a: Variant, b: Variant) => a.displayOrder - b.displayOrder);

    if (variants.length === 0) {
        return null;
    }

    return (
        <>
            <div className={'details-definition-text'}>{t('variants')}:</div>
            <div className={'details-list-positions-wrapper'}>
                {variants.map((variant: Variant) => (
                    <MenuItemDetailsPosition name={getTranslation(variant.name)}
                                             price={`${formatPrice(variant.price + menuItem?.price)} zł`}
                                             key={variant.id}
                    />
                ))}
            </div>
        </>
    );
}