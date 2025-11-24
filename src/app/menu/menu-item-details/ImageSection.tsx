import {s3BucketUrl} from "../../../apiData";
import {setMenuItem} from "../../../slices/mainSlice.ts";
import {useSelector} from "react-redux";
import {Img} from "react-image";
import {useAppDispatch} from "../../../hooks/hooks.ts";
import {ReactSVG} from "react-svg";

type ImageSectionType = {
    hasImage: boolean | null;
}

export const ImageSection = ({hasImage}: ImageSectionType) => {
    const dispatch = useAppDispatch();
    const {menuItem} = useSelector<any, any>(state => state.main.view);

    const hideDetails = () => {
        dispatch(setMenuItem(null));
    }

    const renderImage = () => {
        if (!hasImage) {
            return null;
        }
        return (
            <div className={'details-image-container'}>
                <Img src={`${s3BucketUrl}/${menuItem?.id}.png?t=${menuItem.updated}`}
                     className={'details-image'}
                />
            </div>
        );
    }

    return (
        <section className={'details-image-section'}>
            <button className={'return-button'} onClick={hideDetails}>
                <ReactSVG src={'/theme/icons/chevron-left.svg'}/>
            </button>
            {renderImage()}
        </section>
    );
}