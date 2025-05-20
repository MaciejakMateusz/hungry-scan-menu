import {useSelector} from "react-redux";
import {MenuItemDetails} from "./menu/menu-item-details/MenuItemDetails";
import {Menu} from "./menu/Menu";
import {notifyViewEvent, setMenuItems} from "../slices/statisticsSlice";
import {useAppDispatch} from "../hooks/hooks.ts";
import {useEffect} from "react";

export const ViewsController = () => {
    const dispatch = useAppDispatch();
    const {menuItem} = useSelector<any, any>(s => s.main.view);
    const {menuItems} = useSelector<any, any>(s => s.statistics.menuItemViews);

    useEffect(() => {
        if (!menuItem) return;

        if (!menuItems.includes(menuItem.id)) {
            dispatch(setMenuItems([...menuItems, menuItem.id]));
            dispatch(notifyViewEvent({menuItemId: menuItem.id}));
        }
    }, [dispatch, menuItem, menuItems]);

    return menuItem ? <MenuItemDetails/> : <Menu/>;
};