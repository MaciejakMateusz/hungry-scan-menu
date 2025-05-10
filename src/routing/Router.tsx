import {useEffect} from 'react';
import '../index.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {RedirectTo} from "./RedirectTo.tsx";
import {ViewsController} from "../app/ViewsController";
import {executePostScanActions} from "../slices/postScanSlice";

export const Router = () => {

    useEffect(() => {
        executePostScanActions();
    }, []);

    //todo obsłużyć ścieżkę /invalid-token
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<RedirectTo module={'menu'}/>}/>
                <Route path='/invalid-token' element={<h1>Nieprawidłowy token restauracji</h1>}/>
                <Route path='/menu' element={<ViewsController/>}/>
            </Routes>
        </BrowserRouter>
    )
}