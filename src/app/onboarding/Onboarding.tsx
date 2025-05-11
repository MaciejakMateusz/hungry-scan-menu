import {Img} from "react-image";
import {imagesPath} from "../../apiData";
import {LoadingSpinner} from "../icons/LoadingSpinner.js";
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";
import {setOnboardingActive} from "../../slices/dishesCategoriesSlice";
import {LanguageSwitcher} from "../../locales/LanguageSwitcher.tsx";

export const Onboarding = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();

    return (
        <div className={'onboarding-container'}>
            <Img src={`${imagesPath}onboarding.jpg`}
                 loader={<LoadingSpinner customContainerStyle={{height: 'calc(100% - 50px)'}}/>}
                 className={'onboarding-image'}/>
            <LanguageSwitcher/>
            <div className={'onboarding-button'} onClick={() => dispatch(setOnboardingActive(false))}>
                {t('proceedToMenu')}
            </div>
        </div>
    );
}