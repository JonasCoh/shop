export class GetProduct {

    public id: number;
    public productName: string;
    public price: number;
    public image: string;
    public categoryName: string;

    constructor(getproduct : GetProduct) {

        this.id = getproduct.id;
        this.productName = getproduct.productName;
        this.price = getproduct.price;
        this.image = getproduct.image;
        this.categoryName = getproduct.categoryName
         }
}
