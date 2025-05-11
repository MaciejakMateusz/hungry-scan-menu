import {createRoot} from 'react-dom/client'
import './index.css'
import {Router} from "./routing/Router.tsx";
import {Provider} from "react-redux";
import {store} from "./store/store.ts";
import {I18nextProvider} from "react-i18next";
import i18n from "./i18n.ts"

createRoot(document.getElementById('root')!).render(
    <I18nextProvider i18n={i18n}>
        <Provider store={store}>
            <Router/>
        </Provider>
    </I18nextProvider>
);