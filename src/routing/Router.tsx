import '../index.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {RedirectTo} from "./RedirectTo.tsx";
import {ViewsController} from "../app/ViewsController";
import {useEffect} from "react";
import {useAppDispatch} from "../hooks/hooks.ts";
import {executePostScanActions} from "../slices/postScanSlice.ts";
import {PrivateRoutes} from "./PrivateRoutes.tsx";
import {RestaurantClosed} from "../app/menu/restaurant-closed/RestaurantClosed.tsx";
import {InvalidToken} from "../app/menu/invalid-token/InvalidToken.tsx";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import type {RootState} from "../store/store.ts";

export const Router = () => {
    const dispatch = useAppDispatch();
    const {t} = useTranslation();
    const {restaurantToken} = useSelector((state: RootState) => state.main.view);

    useEffect(() => {
        if (restaurantToken !== '') dispatch(executePostScanActions(restaurantToken));
    }, [dispatch, restaurantToken]);

    return (
        <BrowserRouter future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true
        }}>
            <Routes>
                <Route path='/' element={<RedirectTo module={'menu'}/>}/>
                <Route path='/invalid-token' element={<InvalidToken paragraph={t('qrCodeInvalid')}/>}/>
                <Route path='/unauthorized' element={<InvalidToken paragraph={t('rescanQrCode')}/>}/>
                <Route path='/restaurant-closed/:token' element={<RestaurantClosed/>}/>
                <Route element={<PrivateRoutes authPath={'app'}/>}>
                    <Route path='/menu/:preview/:message/:theme/:bannerIconVisible' element={<ViewsController/>}/>
                </Route>
                <Route element={<PrivateRoutes authPath={'menu'}/>}>
                    <Route path='/menu' element={<ViewsController/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}