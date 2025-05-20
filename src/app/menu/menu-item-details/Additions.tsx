import {getTranslation} from "../../../locales/langUtils";
import {formatPrice} from "../../../utils";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import type {Addition} from "../../../interfaces/Addition.ts";
import {MenuItemDetailsPosition} from "./MenuItemDetailsPosition.tsx";

export const Additions = () => {
    const {t} = useTranslation();
    const {menuItem} = useSelector<any, any>(state => state.main.view);

    if (menuItem?.additionalIngredients.length === 0) {
        return null;
    }

    return (
        <>
            <div className={'details-definition-text'}>
                {t('additions')}
                <span className={'optional-text'}> ({t('optional')}):</span>
            </div>
            <div className={'details-list-positions-wrapper'}>
                {menuItem.additionalIngredients.map((addition: Addition) => (
                    <MenuItemDetailsPosition name={getTranslation(addition.name)}
                                             price={`+${formatPrice(addition.price)} zł`}
                                             key={addition.id}
                    />
                ))}
            </div>
        </>
    );
}