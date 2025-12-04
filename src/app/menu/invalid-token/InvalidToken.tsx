import {BrandLogo} from "../../icons/BrandLogo.tsx";
import {useTranslation} from "react-i18next";

export const InvalidToken = () => {
    const {t} = useTranslation();

    return (
        <div className={'pessimistic-path-background'}>
            <div className={'pessimistic-path-container'}>
                <BrandLogo/>
                <div className={'pessimistic-path-header'}>
                    {t('weAreSorry')}
                </div>
                <div className={'pessimistic-path-paragraph'}>
                    {t('qrCodeInvalid')}
                </div>
            </div>
        </div>
    );
}