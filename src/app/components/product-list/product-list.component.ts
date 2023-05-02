import { Component, OnInit } from '@angular/core';
import { CartProductFront } from 'src/app/models/CartProductFront.model';
import { CartProductService } from 'src/app/services/cartproductService/cart-product.service';
import { ProductsService } from 'src/app/services/productService/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  public totalPrice: number = 0;
  public cartId!: { id: number; };
  constructor(public cartProductService: CartProductService, public productService: ProductsService) { }

  ngOnInit(): void {
    this.makeMission();
  }

  getCart(): Promise<{ id: number }> {
    const observable = this.cartProductService.getCart();
    
    return new Promise((resolve, reject) => {
      observable.subscribe((HttpDataResult) => {
        this.cartId = HttpDataResult;
        this.cartProductService.userCartId = HttpDataResult;
        resolve(HttpDataResult)
      }, (HttpErrorResult) => {
        reject(HttpErrorResult)
      })
    })
  }

  getAllProductCart(cartId: { id: number }): Promise<Array<CartProductFront>> {
    const { id } = cartId;
    const observable = this.cartProductService.getAllCartProduct(id);
    return new Promise((resolve, reject) => {
      observable.subscribe((HttpDataResult) => {
        this.cartProductService.cartProductFront = HttpDataResult
        resolve(HttpDataResult)
      }, (HttpErrorResult) => {
        reject(HttpErrorResult)
      })
    })
  }

  async makeMission(): Promise<void> {
    try {
      const cartId = await this.getCart()
      const productsCart: Array<CartProductFront> = await this.getAllProductCart(cartId)
      const totalPrice:number = productsCart.reduce((prevElement, currentElement) => {
        return prevElement + Number(currentElement.price);
      }, 0)
      this.cartProductService.cartPriceTotal = totalPrice
    } catch (e) {
      console.log(e)
    }

  }
}

