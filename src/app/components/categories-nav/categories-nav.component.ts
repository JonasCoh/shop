import { Component, OnInit } from '@angular/core';
import { categories } from 'src/app/data/categories';
import { CategoryModel } from 'src/app/models/category.model';
import { ProductsService } from 'src/app/services/productService/products.service';
@Component({
  selector: 'app-categories-nav',
  templateUrl: './categories-nav.component.html',
  styleUrls: ['./categories-nav.component.css']
})
export class CategoriesNavComponent implements OnInit {

  public categories:CategoryModel[] = categories
  constructor(public productsService:ProductsService) { }

  ngOnInit(): void {
  }

  filterCategories(categoryName:string){
    console.log(categoryName)
    this.productsService.productsCategory=categoryName;
  }

}
