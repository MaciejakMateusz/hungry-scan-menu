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

export const uuidV4 = () => {
    const c = globalThis.crypto;
    if (c?.randomUUID) return c.randomUUID();

    if (!c?.getRandomValues) {
        throw new Error("No secure crypto available for UUID generation");
    }

    const bytes = new Uint8Array(16);
    c.getRandomValues(bytes);
    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;

    const hex = [...bytes].map(b => b.toString(16).padStart(2, "0")).join("");
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}