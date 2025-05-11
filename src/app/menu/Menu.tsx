import {LocalizationContainer} from "./LocalizationContainer.js";
import {WelcomeTextContainer} from "./WelcomeTextContainer";
import {CategoriesNavigation} from "./CategoriesNavigation.js";
import {MenuItemsList} from "./MenuItemsList";

export const Menu = () => {

    return (
        <div>
            <LocalizationContainer/>
            <WelcomeTextContainer/>
            <CategoriesNavigation/>
            <MenuItemsList/>
        </div>
    );
}
