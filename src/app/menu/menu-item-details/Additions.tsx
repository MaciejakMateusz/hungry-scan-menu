import {getTranslation} from "../../../locales/langUtils";
import {formatPrice} from "../../../utils";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import type {Addition} from "../../../interfaces/Addition.ts";
import {MenuItemDetailsPosition} from "./MenuItemDetailsPosition.tsx";

export const Additions = () => {
    const {t} = useTranslation();
    const {menuItem} = useSelector<any, any>(state => state.main.view);
    const filteredAdditions = menuItem?.additionalIngredients
        .filter((addition: Addition) => addition.available);

    if (filteredAdditions === 0) {
        return null;
    }

    return (
        <>
            <div className={'details-definition-text'}>
                {t('additions')}
                <span className={'optional-text'}> ({t('optional')}):</span>
            </div>
            <div className={'details-list-positions-wrapper'}>
                {filteredAdditions.map((addition: Addition) => (
                    <MenuItemDetailsPosition name={getTranslation(addition.name)}
                                             price={`+${formatPrice(addition.price)} zł`}
                                             key={addition.id}
                    />
                ))}
            </div>
        </>
    );
}