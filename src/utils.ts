import type {CookieSettings} from "./interfaces/CookieSettings.ts";

export const getCookie = (cookieName: string) => {
    const prefix = `${cookieName}=`;
    const cookie = document.cookie
        .split("; ")
        .find(row => row.startsWith(prefix));

    return cookie ? decodeURIComponent(cookie.slice(prefix.length)) : "";
};

export const setCookie = (
    cookieName: string,
    value: string,
    settings: CookieSettings = {}
) => {
    const name = encodeURIComponent(cookieName);
    const val = encodeURIComponent(value);

    const parts: string[] = [`${name}=${val}`];

    if (settings.maxAge != null) parts.push(`Max-Age=${Math.floor(settings.maxAge)}`);
    if (settings.expires) parts.push(`Expires=${settings.expires.toUTCString()}`);

    parts.push(`Path=${settings.path ?? "/"}`);
    if (settings.domain) parts.push(`Domain=${settings.domain}`);

    const sameSite = settings.sameSite ?? "Lax";
    parts.push(`SameSite=${sameSite}`);

    const secure = settings.secure ?? (sameSite === "None");
    if (secure) parts.push("Secure");

    document.cookie = parts.join("; ");
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