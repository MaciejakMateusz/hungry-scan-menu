import {ReactSVG} from "react-svg";
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";

type BannerType = {
    name: string;
    iconPath: string;
    bigFont: boolean | undefined;
}

export const Banner = ({name, iconPath, bigFont}: BannerType) => {
    const {menu} = useSelector<any, any>(state => state.main.getMenu);
    const {bannerIconVisible} = useParams();
    const shouldShowIcon = bannerIconVisible ? bannerIconVisible === 'true' : menu?.bannerIconVisible;

    const renderIcon = () => {
        if (!shouldShowIcon) return;
        return (<ReactSVG src={iconPath} className={'banner-icon'}/>);
    }

    return (
        <div className={`banner-container ${bigFont ? 'big-font' : ''} ${shouldShowIcon ? 'with-icon' : ''}`}>
            {renderIcon()}
            {name}
        </div>
    );
}