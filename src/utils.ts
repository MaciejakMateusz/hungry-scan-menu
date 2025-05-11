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

export const formatCurrency = (value: string) => {
    if (!value) return '';
    const parts = value.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
};

export function deleteCookie(name: string) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

export const urlParamValue = (param: string) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(param);
}

export const formatPrice = (price: number) => {
    let formattedPrice = price.toFixed(2);
    formattedPrice = formattedPrice.replace('.', ',');
    return formattedPrice;
}