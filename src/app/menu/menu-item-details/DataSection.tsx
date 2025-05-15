import {NameAndDescription} from "./NameAndDescription";
import {Allergens} from "./Allergens.js";
import {Variants} from "./Variants";
import {Additions} from "./Additions.js";
import {getVariants} from "../../../slices/dishesCategoriesSlice";
import {useEffect} from "react";
import {useAppDispatch} from "../../../hooks/hooks.ts";
import {BannersLabelsTopper} from "./BannersLabelsTopper.tsx";

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
                <Allergens/>
                <Variants/>
                <Additions/>
            </div>
        </section>
    );
}