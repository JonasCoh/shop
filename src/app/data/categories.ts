import { CategoryModel } from "../models/category.model";
import { ProductCategory } from "../models/ProductCategory";

export const categories: CategoryModel[] = [
    { categoryID: ProductCategory.MilkAngEgg, categoryName: "Milk & Eggs" },
    { categoryID: ProductCategory.VegetablesAndFruits, categoryName: "Vegetables & Fruits" },
    { categoryID: ProductCategory.MeatAndFish, categoryName: "Meat & Fish" }
  ];
