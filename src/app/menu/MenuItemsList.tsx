import {useSelector} from "react-redux";
import {MenuItemPosition} from "./menu-item/MenuItemPosition.tsx";
import {useTranslation} from "react-i18next";
import type {MenuItem} from "../../interfaces/MenuItem.ts";
import {LoadingSpinner} from "../icons/LoadingSpinner.tsx";
import type {RootState} from "../../store/store.ts";

export const MenuItemsList = () => {
    const {t} = useTranslation();
    const chosenCategory = useSelector<any, any>(state => state.main.view.category);
    const {filterActive, filteredItems} = useSelector<any, any>(state => state.main.view);
    const {isPending} = useSelector<any, any>(state => state.main.filter);
    const {isLoading} = useSelector<any, any>((state: RootState) => state.main.getMenu);
    const noPositions = chosenCategory?.menuItems.length === 0;
    const noFilteredItems = filterActive && (!filteredItems || filteredItems?.length === 0) && !isPending;

    const renderMenuItems = () => {
        if (!chosenCategory) {
            return null;
        }

        if (filterActive) {
            return filteredItems
                ?.filter((menuItem: MenuItem) => menuItem.available)
                .map((menuItem: MenuItem) => (
                    <MenuItemPosition key={menuItem?.id} menuItem={menuItem}/>
                ))
        }

        return chosenCategory.menuItems
            ?.filter((menuItem: MenuItem) => menuItem.available)
            .map((menuItem: MenuItem) => (
                <MenuItemPosition key={menuItem?.id} menuItem={menuItem}/>
            ));
    }

    return (
        <div className={'menu-items-wrapper'}>
            {renderMenuItems()}
            {(isLoading || isPending) && <LoadingSpinner/>}
            {(noPositions || noFilteredItems) && <p className={'no-positions-text'}>{t('noPositions')}</p>}
        </div>
    );
}