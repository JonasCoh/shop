import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CartProductFront } from 'src/app/models/CartProductFront.model';
import { CartProductService } from 'src/app/services/cartproductService/cart-product.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(public cartService: CartProductService, public router: Location) { }

  ngOnInit(): void {

  }


  colorOrder(value: string) {

    if (value === "") {
      this.cartService.cartProductFront.map(
        (cartProduct: CartProductFront) => {
          cartProduct.backgroundColor = 'white'
          return cartProduct
        })
    }

    else {
      this.cartService.cartProductFront.map(
        (cartProduct: CartProductFront) => {
          const flag = cartProduct.productName.includes(value);
          if (flag) {
            cartProduct.backgroundColor = 'yellow'
            console.log(cartProduct)
          } else { cartProduct.backgroundColor = 'white'; console.log(cartProduct) }
          return cartProduct;
        })
    }


  }

  backToShop() {
    this.router.back();
  }


}
