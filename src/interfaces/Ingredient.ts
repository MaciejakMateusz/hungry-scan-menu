import type {Translatable} from "./Translatable.ts";

export interface Ingredient {
    id: number;
    name: Translatable;
    price: number;
}