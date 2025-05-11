import {useDispatch} from "react-redux";
import {setMenuItem} from "../../slices/dishesCategoriesSlice";
import {MenuItemImage} from "./MenuItemImage";
import {MenuItemContent} from "./MenuItemContent";
import type {MenuItem} from "../../interfaces/MenuItem.ts";

type MenuItemPositionType = {
    menuItem: MenuItem
}

export const MenuItemPosition = ({menuItem}: MenuItemPositionType) => {
    const dispatch = useDispatch();

    return (
        <div className={'menu-item-container'} onClick={() => dispatch(setMenuItem(menuItem))}>
            <div className={`menu-item-grid ${!menuItem.imageName ? 'no-photo' : ''}`}>
                <MenuItemImage menuItem={menuItem}/>
                <MenuItemContent menuItem={menuItem}/>
            </div>
        </div>
    );
}