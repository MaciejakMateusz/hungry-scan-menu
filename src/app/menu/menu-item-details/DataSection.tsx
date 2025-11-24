import {NameAndDescription} from "./NameAndDescription";
import {Variants} from "./Variants";
import {Additions} from "./Additions.js";
import {getVariants} from "../../../slices/mainSlice.ts";
import {useEffect} from "react";
import {useAppDispatch} from "../../../hooks/hooks.ts";
import {BannersLabelsTopper} from "./BannersLabelsTopper.tsx";
import {PriceFooter} from "./PriceFooter.tsx";

type DataSectionType = {
    hasImage: boolean | null;
}

export const DataSection = ({hasImage}: DataSectionType) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getVariants());
    }, [dispatch])

    return (
        <section className={`details-data-section ${!hasImage ? 'no-image' : ''}`}>
            <div className={'details-data-container'}>
                <BannersLabelsTopper/>
                <NameAndDescription/>
                <Variants/>
                <Additions/>
            </div>
            <PriceFooter/>
        </section>
    );
}