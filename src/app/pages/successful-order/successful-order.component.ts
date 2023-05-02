import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as FileSaver from 'file-saver';
import { CartProductFront } from 'src/app/models/CartProductFront.model';

import { CartProductService } from 'src/app/services/cartproductService/cart-product.service';

@Component({
  selector: 'app-successful-order',
  templateUrl: './successful-order.component.html',
  styleUrls: ['./successful-order.component.css']
})
export class SuccessfulOrderComponent implements OnInit {


  constructor(public cartProducts: CartProductService, public router: Router) {

  }

  ngOnInit(): void {

  }

  getRecipit() {
    let userCartProduct: string = this.cartProducts.cartProductFront.reduce((prev, element: CartProductFront) => { return `${prev}${element.productName} \t\t\t capacity:${element.capacity} \t\t\t price:${element.price} \n` }, "")
    userCartProduct += `\n\n Total price: ${this.cartProducts.cartPriceTotal}`
    const getUserProductCart: string = userCartProduct
    const userProduct = new Blob([getUserProductCart], { type: "text/plain;charset=utf-8" })
    FileSaver.saveAs(userProduct, "recipit.txt")

  }

  goHome() {
    this.router.navigate(["products/user"]);
  }
}
