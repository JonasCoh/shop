import { ICategory } from "../models/category.model";
import { ProductCategory } from "../models/ProductCategory";

export const categories: ICategory[] = [
    { categoryId: ProductCategory.MilkAngEgg, categoryName: "Milk & Eggs" },
    { categoryId: ProductCategory.VegetablesAndFruits, categoryName: "Vegetables & Fruits" },
    { categoryId: ProductCategory.MeatAndFish, categoryName: "Meat & Fish" }
  ];