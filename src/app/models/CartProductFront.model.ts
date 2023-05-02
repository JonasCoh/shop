export default class CartProductFront {

     public productId: number;
     public productName: string;
     public capacity: string;
    public price: number;
      public image: string; 
      public cartId: number;
    
    public constructor(cartproductfront : CartProductFront) {
        this.productId = cartproductfront.productId;
        this.productName  = cartproductfront.productName;
        this.capacity = cartproductfront.capacity;
        this.price  = cartproductfront.price;
        this.image = cartproductfront.image; 
        this.cartId= cartproductfront.cartId;
    }


}

