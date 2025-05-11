import type {Translatable} from "./Translatable.ts";

export interface Label {
    id: number;
    name: Translatable;
    iconName: string;
}