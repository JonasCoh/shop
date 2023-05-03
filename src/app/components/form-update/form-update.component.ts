import { ChangeDetectorRef, Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { GetProduct } from 'src/app/models/GetProduct';
import { categories } from 'src/app/data/categories';
import { ProductsService } from 'src/app/services/productService/products.service';
import { CategoryModel } from 'src/app/models/category.model';
import { Location } from '@angular/common';
import { PostProduct } from 'src/app/models/PostProduct';
import { PutProduct } from 'src/app/models/PutProduct';
import { observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-form-update',
  templateUrl: './form-update.component.html',
  styleUrls: ['./form-update.component.css']
})
export class FormUpdateComponent implements OnInit {

  public updateProduct!: UntypedFormGroup;
  public productName!: UntypedFormControl;
  public price!: UntypedFormControl;
  public id!: UntypedFormControl;
  public image: string;
  public categoryName!: UntypedFormControl;
  public formData: FormData = new FormData();
  public categories: CategoryModel[] = categories;
  public file!: File;

  constructor(public productService: ProductsService, public router: Location) {
    this.productName = new UntypedFormControl(this.productService.productToUpdate.productName, Validators.required);
    this.price = new UntypedFormControl(this.productService.productToUpdate.price, [Validators.required, Validators.min(2)]);
    this.id = new UntypedFormControl(this.productService.productToUpdate.id, Validators.required);
    this.image = this.productService.productToUpdate.image;
    this.categoryName = new UntypedFormControl(categories[0].categoryName)
    this.id.disable()
    this.updateProduct = new UntypedFormGroup({ name: this.productName, price: this.price, id: this.id, });
  }

  ngOnInit(): void {

  }

  uploadFile(e: any) {
    this.file = e.target.files[0];

  }

  //public id: number, public productName: string, public price: number, public image: string, public categoryName: string
  formUpdate() {


    const copyProducts = [...this.productService.products];

    const productIndex = this.productService.products.findIndex((product: GetProduct) => product.id === this.id.value)

    this.productSendToServer();

    const observable = this.productService.putProduct(this.formData)

    observable.subscribe((HttpResponseData) => {
      const { id, productName, price, image } = HttpResponseData
      const updateProduct: GetProduct = { id, productName, price, image, categoryName: this.categoryName.value }
      copyProducts.splice(productIndex, 1, updateProduct);
      this.productService.products = copyProducts;

    }, (HttpResponseError) => {
      alert(HttpResponseError.error.error)
    })
    this.router.back()
  }


  getCategoryId() {
    return this.categories.find((category: CategoryModel) => category.categoryName === this.categoryName.value)!.categoryID
  }


  productSendToServer() {
    const categoryId = this.getCategoryId();

    if (this.file !== undefined) {
      this.formData.append("productImage", this.file, this.file.name);
      console.log("get file")
    }
    else {
      this.formData.append("image", this.image);
    }
    this.formData.append("id", this.id.value);
    this.formData.append("productName", this.productName.value);
    this.formData.append("categoryId", categoryId.toString());
    this.formData.append("price", this.price.value);
  }

}
