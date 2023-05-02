import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartProductFront } from 'src/app/models/CartProductFront.model';
import { CartProductService } from 'src/app/services/cartproductService/cart-product.service';

@Component({
  selector: 'app-product-cart-card',
  templateUrl: './product-cart-card.component.html',
  styleUrls: ['./product-cart-card.component.css']
})
export class ProductCartCardComponent implements OnInit {

  @Input() productFront!: CartProductFront;
  constructor(public cartService: CartProductService,public router:Router) { }

  ngOnInit(): void {
    console.log(this.productFront)
  }

  deleteFromCart() {
    const { productId, cartId,price } = this.productFront
    console.log(this.productFront);
    const indexProductFromCartToDeleteFromTheFront = this.cartService.cartProductFront.findIndex((cartProduct: CartProductFront) => cartProduct.productId === productId)
    const observable = this.cartService.deleteProductFromCart(cartId,productId)
    
    if(indexProductFromCartToDeleteFromTheFront !== -1){
      observable.subscribe((HttpDataResult)=>{
        this.cartService.cartProductFront.splice(indexProductFromCartToDeleteFromTheFront,1)
        this.cartService.cartPriceTotal-=price
      },(HttpErrorResult)=>{
        console.log(HttpErrorResult)
      })
    }


  }
}
