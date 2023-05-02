import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { observable } from 'rxjs';
import { categories } from 'src/app/data/categories';
import { ICategory } from 'src/app/models/category.model';
import { GetProduct } from 'src/app/models/GetProduct';
import { PostProduct } from 'src/app/models/PostProduct';
import { ProductCategory } from 'src/app/models/ProductCategory';
import { ProductsService } from 'src/app/services/productService/products.service';

@Component({
  selector: 'app-form-add',
  templateUrl: './form-add.component.html',
  styleUrls: ['./form-add.component.css']
})
export class FormAddComponent implements OnInit {


  public addProduct!: FormGroup;
  public productName!: FormControl;
  public category!: FormControl;
  public price!: FormControl;
  public image!: FormControl;
  public formData: FormData = new FormData();
  public categories: ICategory[] = categories;
  public file!: File;
  
  constructor(public productService: ProductsService,public router:Location) {
    this.productName = new FormControl("", [Validators.required]);
    this.category = new FormControl(categories[0].categoryName);
    this.price = new FormControl("", [Validators.required, Validators.min(1)]);
    this.image = new FormControl("", [Validators.required]);
    this.addProduct = new FormGroup({ productName: this.productName, category: this.category, price: this.price, image: this.image })
  }

  ngOnInit(): void {

  }

  sendProductToServer() {
    const categoryId:ProductCategory = this.getCtegoryId();
    const sendProduct:PostProduct = new PostProduct(this.productName.value,categoryId,this.price.value)
    const {products} = this.productService
    const copyProducts = [...products];
    
    this.formData.append("productImage",this.file,this.file.name)
    this.formData.append("productName",sendProduct.productName);
    this.formData.append("categoryId",sendProduct.categoryId.toString());
    this.formData.append("price",sendProduct.price.toString());

    const observable = this.productService.addProduct(this.formData)

    observable.subscribe((HttpResponseData)=>{
      const product = new GetProduct(products[products.length -1].id+1,this.productName.value,this.price.value,HttpResponseData.image,this.category.value);
      copyProducts.push(product);
      this.productService.products = copyProducts;
      this.router.back()
    },(HttpErrorResponse)=>{alert(HttpErrorResponse)})
  }



  uploadFile(e: any) {
    this.file = e.target.files[0]
    
  }

  getCtegoryId():ProductCategory{
    const category:ICategory= categories.find((category:ICategory)=>category.categoryName === this.category.value) as ICategory;
    return category.categoryId
  }
}
