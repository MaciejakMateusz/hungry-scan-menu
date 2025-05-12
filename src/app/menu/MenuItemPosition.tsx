import {setMenuItem} from "../../slices/dishesCategoriesSlice";
import {MenuItemImage} from "./MenuItemImage";
import {MenuItemContent} from "./MenuItemContent";
import type {MenuItem} from "../../interfaces/MenuItem.ts";
import {useAppDispatch} from "../../hooks/hooks.ts";
import {useImageExists} from "../../hooks/useHasImage.ts";

type MenuItemPositionType = {
    menuItem: MenuItem
}

export const MenuItemPosition = ({menuItem}: MenuItemPositionType) => {
    const dispatch = useAppDispatch();
    const hasImage = useImageExists(menuItem.id);

    return (
        <div className={'menu-item-container'} onClick={() => dispatch(setMenuItem(menuItem))}>
            <div className={`menu-item-grid ${!hasImage ? 'no-photo' : ''}`}>
                <MenuItemImage menuItem={menuItem} hasImage={hasImage}/>
                <MenuItemContent menuItem={menuItem} hasImage={hasImage}/>
            </div>
        </div>
    );
}