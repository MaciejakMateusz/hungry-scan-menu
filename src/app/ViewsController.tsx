import {useSelector} from "react-redux";
import {MenuItemDetails} from "./menu/menu-item-details/MenuItemDetails";
import {Menu} from "./menu/Menu";
import {notifyViewEvent, setMenuItems} from "../slices/statisticsSlice";
import {useAppDispatch} from "../hooks/hooks.ts";

export const ViewsController = () => {
    const dispatch = useAppDispatch();
    const {menuItem} = useSelector<any, any>(state => state.dishesCategories.view);
    const {menuItems} = useSelector<any, any>(state => state.statistics.menuItemViews);

    const renderViews = () => {
        if (menuItem) {
            if (!menuItems.includes(menuItem.id)) {
                dispatch(setMenuItems([...menuItems, menuItem.id]));
                dispatch(notifyViewEvent({menuItemId: menuItem.id}));
            }
            return (<MenuItemDetails/>);
        }
        return (<Menu/>);
    }

    return (
        <>
            {renderViews()}
        </>
    );
}