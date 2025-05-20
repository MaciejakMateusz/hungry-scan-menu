import type {Allergen} from "../../../interfaces/Allergen.ts";
import {ReactSVG} from "react-svg";
import {getTranslation} from "../../../locales/langUtils.ts";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";

export const Allergens = () => {
    const {t} = useTranslation();
    const {menuItem} = useSelector<any, any>(state => state.main.view);

    return (
        <div>
            <p className={'allergens-tooltip-header'}>{t('canContain')}</p>
            {menuItem.allergens.map((a: Allergen) => (
                <div key={a.id} className={'allergen-position'}>
                    <ReactSVG src={`/theme/icons/${a.iconName}`}/>
                    <span>{getTranslation(a.name)}</span>
                </div>
            ))}
        </div>
    );
}