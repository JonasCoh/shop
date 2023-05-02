import { Component, Input, OnInit } from '@angular/core';
import { CartProductFront } from 'src/app/models/CartProductFront.model';
import { CartProductPost } from 'src/app/models/CartProductPost.model';
import { GetProduct } from 'src/app/models/GetProduct';
import { CartProductService } from 'src/app/services/cartproductService/cart-product.service';
import { ProductsService } from 'src/app/services/productService/products.service';


@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.css']
})
export class ProductModalComponent implements OnInit {

  public capacity: string = "0"


  constructor(public productService: ProductsService, public cartService: CartProductService) {

  }

  ngOnInit(): void {

  }

  defaultInitilized() {
    this.capacity = "0";
  }

  saveCapacity() {
    //product id ,price  from the productService capacity from input cartid from cartProduct service   
    if (this.capacity >= "1") {
      const { id, price,productName,image } = this.productService.productShowModal
      const cartProduct = new CartProductPost(id, this.capacity, price, this.cartService.userCartId.id);
      const productFront:CartProductFront = new CartProductFront(id,productName,this.capacity,price * Number(this.capacity),image,this.cartService.userCartId.id)
      const observable = this.cartService.postProductToCart(cartProduct);
      observable.subscribe((HttpResultData) => {
        console.log(HttpResultData)
        this.cartService.cartProductFront.push(productFront);
        this.cartService.cartPriceTotal+=productFront.price;
      }, (HttpResultError) => {
        console.log(HttpResultError)
      })
    }

    this.defaultInitilized()
  }


}
