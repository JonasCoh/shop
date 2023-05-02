import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { categories } from 'src/app/data/categories';
import { ICategory } from 'src/app/models/category.model';
import { GetProduct } from 'src/app/models/GetProduct';
import { ProductsService } from 'src/app/services/productService/products.service';

@Component({
  selector: 'app-products-admin',
  templateUrl: './products-admin.component.html',
  styleUrls: ['./products-admin.component.css']
})
export class ProductsAdminComponent implements OnInit {

  public categories: ICategory[] = categories;
  public currentProductToUpdate!: GetProduct;

  constructor(public productsService: ProductsService, public router:Router) { }

  ngOnInit(): void {
    
    this.productsService.productsCategory = categories[0].categoryName;
    
    const observable = this.productsService.getAllProducts()
    observable.subscribe((HttpResponseDate: Array<GetProduct>) => {
      console.log(HttpResponseDate);
      this.productsService.products = HttpResponseDate;
    })
  }

  updateProduct(product: GetProduct) {
    this.productsService.productToUpdate = product;
    this.router.navigate([`products/admin/update`])
  }

  addProduct(){
    this.router.navigate(["products/admin/insert"])
  }
}
