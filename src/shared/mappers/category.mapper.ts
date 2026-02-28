import type { ICategory } from "@/shared/types/category.type";
import type { ISelectBaseProps } from "@/shared/types/selectBase.types";

export function mapCategoriesToSelectOptions(categories: ICategory[]): ISelectBaseProps<string>[] {
    return categories.map(category => ({
        label: category.name,
        value: category.id,
    }));
}
