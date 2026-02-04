import {useMemo} from "react";
import {useSelector} from "react-redux";
import {MenuItemPosition} from "./menu-item/MenuItemPosition.tsx";
import {useTranslation} from "react-i18next";
import type {MenuItem} from "../../interfaces/MenuItem.ts";
import {LoadingSpinner} from "../icons/LoadingSpinner.tsx";
import type {RootState} from "../../store/store.ts";
import {useAppDispatch} from "../../hooks/hooks.ts";
import {setCategory} from "../../slices/mainSlice.ts";
import type {Category} from "../../interfaces/Category.ts";
import {SwipeService} from "../../utils/SwipeService.ts";

export const MenuItemsList = () => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();

    const categories = useSelector((state: RootState) => state.main.getMenu.categories);
    const chosenCategory = useSelector<any, any>((state) => state.main.view.category);
    const {filterActive, filteredItems} = useSelector<any, any>((state) => state.main.view);
    const {isPending} = useSelector<any, any>((state) => state.main.filter);
    const {isLoading} = useSelector<any, any>((state: RootState) => state.main.getMenu);

    const noPositions = chosenCategory?.menuItems.length === 0;
    const noFilteredItems = filterActive && (!filteredItems || filteredItems?.length === 0) && !isPending;

    const getCurrentIndex = () => {
        if (!chosenCategory) return -1;
        return categories.findIndex((c: Category) => c.id === chosenCategory.id);
    };

    const goNext = () => {
        const i = getCurrentIndex();
        if (i < 0 || categories.length === 0) return;

        const next: Category = categories[Math.min(i + 1, categories.length - 1)];
        if (next?.id !== chosenCategory?.id) dispatch(setCategory(next));
    };

    const goPrev = () => {
        const i = getCurrentIndex();
        if (i < 0 || categories.length === 0) return;

        const prev: Category = categories[Math.max(i - 1, 0)];
        if (prev?.id !== chosenCategory?.id) dispatch(setCategory(prev));
    };

    const swipeService = useMemo(() => {
        return new SwipeService(
            () => !filterActive,
            () => goNext(),
            () => goPrev(),
            {
                swipeDistance: 60,
                swipeTime: 600,
                axisThreshold: 10,
            }
        );
    }, [filterActive, chosenCategory, categories]);

    const renderMenuItems = () => {
        if (!chosenCategory) return null;

        if (filterActive) {
            return filteredItems
                ?.filter((menuItem: MenuItem) => menuItem.available)
                .map((menuItem: MenuItem) => (
                    <MenuItemPosition key={menuItem?.id} menuItem={menuItem}/>
                ));
        }

        return chosenCategory.menuItems
            ?.filter((menuItem: MenuItem) => menuItem.available)
            .map((menuItem: MenuItem) => (
                <MenuItemPosition key={menuItem?.id} menuItem={menuItem}/>
            ));
    };

    return (
        <div className={'menu-items-wrapper'}
             onPointerDown={swipeService.onPointerDown}
             onPointerMove={swipeService.onPointerMove}
             onPointerUp={swipeService.onPointerUp}
             onPointerCancel={swipeService.onPointerUp}>
            {renderMenuItems()}
            {(isLoading || isPending) && <LoadingSpinner/>}
            {(noPositions || noFilteredItems) && <p className={'no-positions-text'}>{t('noPositions')}</p>}
        </div>
    );
};
