import type {Translatable} from "./Translatable.ts";
import type {Label} from "./Label.ts";
import type {Allergen} from "./Allergen.ts";
import type {Ingredient} from "./Ingredient.ts";
import type {Variant} from "./Variant.ts";
import type {Banner} from "./Banner.ts";

export interface MenuItem {
    id: number;
    name: Translatable;
    description: Translatable;
    categoryId: number;
    price: number;
    promoPrice: number;
    labels: Label[];
    allergens: Allergen[];
    additionalIngredients: Ingredient[];
    variants: Variant[];
    banners: Banner[];
}