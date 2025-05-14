import {ReactSVG} from "react-svg";

type BannerType = {
    name: string;
    iconPath: string;
}

export const Banner = ({name, iconPath}: BannerType) => {
    return (
        <div className={'banner-container'}>
            <ReactSVG src={iconPath} className={'banner-icon'}/>
            {name}
        </div>
    );
}