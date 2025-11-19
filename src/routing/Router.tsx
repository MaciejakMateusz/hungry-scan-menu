import '../index.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {RedirectTo} from "./RedirectTo.tsx";
import {ViewsController} from "../app/ViewsController";
import {useEffect} from "react";
import {useAppDispatch} from "../hooks/hooks.ts";
import {executePostScanActions} from "../slices/postScanSlice.ts";
import {PrivateRoutes} from "./PrivateRoutes.tsx";

export const Router = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(executePostScanActions());
    }, [dispatch]);

    //todo obsłużyć ścieżkę /invalid-token
    return (
        <BrowserRouter future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true
        }}>
            <Routes>
                <Route path='/' element={<RedirectTo module={'menu'}/>}/>
                <Route path='/invalid-token' element={<h1>Nieprawidłowy token restauracji</h1>}/>
                <Route path='/menu' element={<ViewsController/>}/>
                <Route element={<PrivateRoutes/>}>
                    <Route path='/menu/:preview/:message/:theme/:bannerIconVisible' element={<ViewsController/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}