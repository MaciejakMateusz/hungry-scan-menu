import type {SameSite} from "./SameSite.ts";

export type CookieSettings = {
    maxAge?: number;
    expires?: Date;
    path?: string;
    domain?: string;
    sameSite?: SameSite;
    secure?: boolean;
};