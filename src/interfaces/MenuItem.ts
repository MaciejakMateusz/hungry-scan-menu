import type {Translatable} from "./Translatable.ts";

export interface MenuItem {
    id: number;
    name: Translatable;
    description: Translatable;
    price: number;
    imageName: string;
    bestseller: boolean;
    new: boolean;
}