import type {MenuItem} from "../../../interfaces/MenuItem.ts";
import {s3BucketUrl} from "../../../apiData.ts";
import {Img} from "react-image";

type MenuItemImageType = {
    menuItem: MenuItem;
    hasImage: boolean | null;
}

export const MenuItemImage = ({menuItem, hasImage}: MenuItemImageType) => {

    if (!hasImage) {
        return null;
    }

    return (
        <div className={`menu-item-image-container ${!hasImage ? 'no-photo' : ''}`}>
            <Img alt={'Menu position image'}
                 className={'menu-item-image'}
                 src={`${s3BucketUrl}/${menuItem.id}.png?t=${menuItem.updated}`}
            />
        </div>
    );
};