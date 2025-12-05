import {BrandLogo} from "../../icons/BrandLogo.tsx";
import {useTranslation} from "react-i18next";

type InvalidTokenProps = {
    paragraph: string;
}

export const InvalidToken = ({paragraph}: InvalidTokenProps) => {
    const {t} = useTranslation();

    return (
        <div className={'pessimistic-path-background'}>
            <div className={'pessimistic-path-container'}>
                <BrandLogo/>
                <div className={'pessimistic-path-header'}>
                    {t('weAreSorry')}
                </div>
                <div className={'pessimistic-path-paragraph'}>
                    {paragraph}
                </div>
            </div>
        </div>
    );
}