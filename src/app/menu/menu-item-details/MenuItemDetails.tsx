import {useEffect} from "react";
import {PriceFooter} from "./PriceFooter";
import {ImageSection} from "./ImageSection.js";
import {DataSection} from "./DataSection.js";
import {useImageExists} from "../../../hooks/useImageExists.ts";
import {useSelector} from "react-redux";

export const MenuItemDetails = () => {
    const {menuItem} = useSelector<any, any>(state => state.main.view);
    const hasImage = useImageExists(menuItem?.id);

    useEffect(() => {
        window.scrollTo({ top: 0});
    }, []);

    return (
        <div className={'menu-item-details-container'}>
            <ImageSection hasImage={hasImage}/>
            <DataSection hasImage={hasImage}/>
            <PriceFooter/>
        </div>
    );
}