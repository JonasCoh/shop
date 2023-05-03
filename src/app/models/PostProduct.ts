import { ProductCategory } from "./ProductCategory";

 export class PostProduct {

    public productName:string;
    public categoryId:ProductCategory;
    public price :number;

    constructor(postproduct : PostProduct){

        this.productName = postproduct.productName;
        this.categoryId =postproduct.categoryId;
        this.price = postproduct.price
    }
}
