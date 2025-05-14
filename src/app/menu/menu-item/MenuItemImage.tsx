import {LazyLoadImage} from 'react-lazy-load-image-component';
import type {MenuItem} from "../../../interfaces/MenuItem.ts";
import {s3BucketUrl} from "../../../apiData.ts";

type MenuItemImageType = {
    menuItem: MenuItem;
    hasImage: boolean | null;
}

export const MenuItemImage = ({menuItem, hasImage}: MenuItemImageType) => {
    
    if (!hasImage) {
        return (<></>);
    }

    return (
        <div className={`menu-item-image-container ${!hasImage ? 'no-photo' : ''}`}>
            <LazyLoadImage alt={'Menu position image'}
                           className={'menu-item-image'}
                           src={`${s3BucketUrl}/${menuItem.id}?t=${menuItem.updated}`}
                           placeholderSrc="/theme/images/placeholder-image.png"
            />
        </div>
    );
};