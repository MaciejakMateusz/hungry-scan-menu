import {imagesPath} from "../../../apiData";
import {setMenuItem} from "../../../slices/dishesCategoriesSlice";
import {useSelector} from "react-redux";
import {ArrowLeftIcon} from "../../icons/ArrowLeftIcon.js";
import {Img} from "react-image";
import {LoadingSpinner} from "../../icons/LoadingSpinner.js";
import {useAppDispatch} from "../../../hooks/hooks.ts";

export const ImageSection = () => {
    const dispatch = useAppDispatch();
    const {menuItem} = useSelector<any, any>(state => state.dishesCategories.view);
    const imgName = menuItem.imageName;

    const hideDetails = () => {
        dispatch(setMenuItem(null));
    }

    const renderImage = () => {
        if (!imgName) {
            return (<></>);
        }
        return (
            <div className={'details-image-container'}>
                <Img src={imagesPath + imgName}
                     loader={<LoadingSpinner customContainerStyle={{height: 'calc(100% - 470px)'}}/>}
                     className={'details-image'}
                />
            </div>
        );
    }

    return (
        <section className={'details-image-section'}>
            <button className={'return-button'} onClick={hideDetails}><ArrowLeftIcon/></button>
            {renderImage()}
        </section>
    );
}