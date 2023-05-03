import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { categories } from 'src/app/data/categories';
import { CartProductFront } from 'src/app/models/CartProductFront.model';
import { CategoryModel } from 'src/app/models/category.model';
import { GetProduct } from 'src/app/models/GetProduct';
import { CartProductService } from 'src/app/services/cartproductService/cart-product.service';
import { ProductsService } from 'src/app/services/productService/products.service';

@Component({
  selector: 'app-products-user',
  templateUrl: './products-user.component.html',
  styleUrls: ['./products-user.component.css']
})
export class ProductsUserComponent implements OnInit {

  public categories: CategoryModel[] = categories;


  constructor(public productsService: ProductsService, public router: Router, public cartService: CartProductService) { }

  ngOnInit(): void {
    this.getAllProducts();
    this.clearFrontColor()
  }

  getAllProducts() {
    this.productsService.productsCategory = categories[0].categoryName;
    const observable = this.productsService.getAllProducts()
    observable.subscribe((HttpResponseDate: Array<GetProduct>) => {
      console.log(HttpResponseDate);
      this.productsService.products = HttpResponseDate;
    })
  }

  deleteProductCart() {
    const observable = this.cartService.deleteAllProductInCart(this.cartService.userCartId.id)
    observable.subscribe((HttpDataResult) => {
      this.cartService.cartProductFront = []
      this.cartService.cartPriceTotal = 0;
    }, (HttpErrorResult) => console.log(HttpErrorResult))
  }

  showProductOnModal(product: GetProduct) {
    this.productsService.productShowModal = product;
  }

  getSearchProduct(text: string) {
    const observable = this.productsService.getProductsSearch(text)
    observable.subscribe((HttpDataResult) => {
      console.log(HttpDataResult)
      this.productsService.products = HttpDataResult;
    }, (HttpErrorResult) => {
      console.log(HttpErrorResult)
    })
  }

  clearFrontColor() {
    // THIS IS NOT HTML this is invalid
    // this.cartService.cartProductFront.forEach((element: CartProductFront) => element.backgroundColor = "white")
  }

  orderPage() {
    this.router.navigate(["order/user"])
  }
}
