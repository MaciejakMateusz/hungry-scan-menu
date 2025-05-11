import {Banner} from "./menu-item-details/Banner.js";
import {imagesPath} from "../../apiData";
import {LazyLoadImage} from 'react-lazy-load-image-component';
import type {MenuItem} from "../../interfaces/MenuItem.ts";

type MenuItemImageType = {
    menuItem: MenuItem;
}

export const MenuItemImage = ({menuItem}: MenuItemImageType) => {
    const imgName = menuItem.imageName;

    if (!imgName) {
        return (<></>);
    }

    return (
        <div className={`menu-item-image-container`}>
            <Banner menuItem={menuItem}/>
            <LazyLoadImage
                className={'menu-item-image'}
                alt="img"
                src={imagesPath + imgName}
                placeholderSrc={`/theme/images/placeholder-image.png`}
            />
        </div>
    );
}