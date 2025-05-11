import {Banner} from "./Banner.js";
import {NameAndDescription} from "./NameAndDescription";
import {Allergens} from "./Allergens.js";
import {Variants} from "./Variants";
import {Additions} from "./Additions.js";
import {useSelector} from "react-redux";
import {getVariants} from "../../../slices/dishesCategoriesSlice";
import {useEffect} from "react";
import {useAppDispatch} from "../../../hooks/hooks.ts";

export const DataSection = () => {
    const dispatch = useAppDispatch();
    const {menuItem} = useSelector<any, any>(state => state.dishesCategories.view);
    const imgName = menuItem.imageName;

    useEffect(() => {
        dispatch(getVariants());
    }, [dispatch])

    return (
        <section className={`details-data-section ${!imgName ? 'no-image' : ''}`}>
            <div className={'details-data-container'}>
                <Banner detailMode={true} menuItem={menuItem}/>
                <NameAndDescription/>
                <Allergens/>
                <Variants/>
                <Additions/>
            </div>
        </section>
    );
}