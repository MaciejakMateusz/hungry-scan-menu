import {useEffect} from "react";
import {PriceFooter} from "./PriceFooter";
import {ImageSection} from "./ImageSection.js";
import {DataSection} from "./DataSection.js";

export const MenuItemDetails = () => {

    useEffect(() => {
        window.scrollTo({ top: 0});
    }, []);

    return (
        <div className={'menu-item-details-container'}>
            <ImageSection/>
            <DataSection/>
            <PriceFooter/>
        </div>
    );
}