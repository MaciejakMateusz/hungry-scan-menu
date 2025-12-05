import {useEffect, useState} from 'react';
import {Navigate, Outlet, useLocation} from 'react-router-dom';
import {apiHost} from "../apiData";
import {LoadingSpinner} from "../app/icons/LoadingSpinner";
import {getLanguage} from "../locales/langUtils";

type PrivateRoutesProps = {
    authPath: string;
}

export const PrivateRoutes = ({authPath}: PrivateRoutesProps) => {
    const location = useLocation();
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [redirectUrl, setRedirectUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [serverDown, setIsServerDown] = useState(false);

    useEffect(() => {
        const authorizeRequest = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`${apiHost}/api/auth/${authPath}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept-Language': getLanguage()
                    },
                    credentials: 'include'
                });
                await handleResponse(response);
            } catch {
                setIsAuthorized(false);
                setIsServerDown(true);
            } finally {
                setIsLoading(false);
            }
        }
        authorizeRequest();
    }, [authPath, location.pathname]);

    const handleResponse = async (response: any) => {
        if (response.ok) {
            setIsAuthorized(true);
        } else if (response.status === 302) {
            const body = await response.json();
            setRedirectUrl(body.redirectUrl);
        }
    }

    if (isLoading) {
        return (<LoadingSpinner/>);
    } else if (redirectUrl) {
        window.location.href = redirectUrl;
        return;
    } else if (isAuthorized) {
        return (<Outlet/>);
    } else if (serverDown) {
        return (<Navigate to={'/server-down'}/>);
    }
    return (<Navigate to={authPath === 'app' ? '/invalid-token' : '/unauthorized'}/>);
};