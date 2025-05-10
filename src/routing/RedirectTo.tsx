import {useEffect} from "react";

type RedirectToType = {
    module: string;
}

export const RedirectTo = ({module}: RedirectToType) => {
    useEffect(() => {
        switch (module) {
            case "menu":
                window.location.href = '/menu';
                break;
            default:
                window.location.href = '/menu';
        }
    }, [module]);
    return null;
}