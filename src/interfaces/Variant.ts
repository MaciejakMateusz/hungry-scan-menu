import type {Translatable} from "./Translatable.ts";

export interface Variant {
    id: number;
    name: Translatable;
    price: number;
    available: boolean;
    displayOrder: number;
}