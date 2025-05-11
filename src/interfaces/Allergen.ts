import type {Translatable} from "./Translatable.ts";

export interface Allergen {
    id: number;
    name: Translatable;
    description: Translatable;
    iconName: string;
}