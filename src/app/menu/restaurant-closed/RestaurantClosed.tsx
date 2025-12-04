import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {getOperatingHours} from "../../../slices/postScanSlice.ts";
import {useAppDispatch} from "../../../hooks/hooks.ts";
import {useSelector} from "react-redux";
import {BrandLogo} from "../../icons/BrandLogo.tsx";
import {useTranslation} from "react-i18next";

export const RestaurantClosed = () => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    const {token} = useParams();
    const {operatingHours} = useSelector<any, any>(state => state.postScan.operatingHours);
    const days = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];

    useEffect(() => {
        dispatch(getOperatingHours(token));
    }, [dispatch, token]);

    return (
        <div className={'pessimistic-path-background'}>
            <div className={'pessimistic-path-container'}>
                <BrandLogo/>
                <div className={'pessimistic-path-header'}>
                    {t('weAreSorry')}
                </div>
                <div className={'pessimistic-path-paragraph'}>
                    {t('weAreClosed')}
                </div>
                {operatingHours &&
                    <div className={'operating-hours-container'}>
                        {days.map(day => (
                            <div className={'operating-hours-position'} key={day}>
                                <span className={'operating-hours-day'}>
                                    {t(day.toLowerCase())}:
                                </span>
                                {operatingHours[day].available ?
                                    <span>{operatingHours[day].startTime} - {operatingHours[day].endTime}</span>
                                    :
                                    <span>{t('closed')}</span>
                                }
                            </div>
                        ))}
                    </div>
                }
            </div>
        </div>
    );
}