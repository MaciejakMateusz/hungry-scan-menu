import {ReactSVG} from "react-svg";
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";

type BannerType = {
    name: string;
    iconPath: string;
}

export const Banner = ({name, iconPath}: BannerType) => {
    const {menu} = useSelector<any, any>(state => state.main.getMenu);
    const {bannerIconVisible} = useParams();

    const renderIcon = () => {
        const shouldShowIcon = bannerIconVisible ? bannerIconVisible === 'true' : menu?.bannerIconVisible;
        if (!shouldShowIcon) return;
        return (<ReactSVG src={iconPath} className={'banner-icon'}/>);
    }

    return (
        <div className={'banner-container'}>
            {renderIcon()}
            {name}
        </div>
    );
}