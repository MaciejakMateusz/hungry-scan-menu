import i18n from "i18next";

export const getCookie = (cookieName: string) => {
    let cookie: string = "";
    document.cookie.split(';').forEach(function (el) {
        const [key, value] = el.split('=');
        if(key === cookieName) {
            cookie = value;
            return;
        }
    })
    return cookie;
};

export const getLanguage = () => {
    return i18n?.language ? i18n.language : getCookie('i18next');
}