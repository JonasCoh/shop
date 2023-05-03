import { ProductCategory } from "./ProductCategory";

export class PutProduct {

    public id: number;
    public productName:string;
    public categoryId:ProductCategory;
    public price :number;
    public image:string;

    constructor(putproduct : PutProduct) {

        this.id = putproduct.id;
        this.productName = putproduct.productName;
        this.categoryId = putproduct.categoryId;
        this.price = putproduct.price;
        this.image =putproduct.image;
     }
}
