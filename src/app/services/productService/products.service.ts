import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, async, observable } from 'rxjs';
import { GetProduct } from 'src/app/models/GetProduct';
import { PostProduct } from 'src/app/models/PostProduct';
import { PutProduct } from 'src/app/models/PutProduct';
import { ConfigService } from '../config/config.service';
import { firstValueFrom } from 'src/app/util/firstValueFrom';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  public productToUpdate!: GetProduct;
  public productShowModal!: GetProduct;
  public products: GetProduct[] = [];
  public productsCategory!: string;

  constructor(private http: HttpClient, private config: ConfigService) {}

  getAllProducts(): Observable<Array<GetProduct>> {
    return this.http.get<Array<GetProduct>>('http://localhost:3006/products');
  }

  addProduct(product: FormData) {
    return this.http.post<{ image: string }>(
      'http://localhost:3006/products',
      product
    );
  }

  putProduct(product: FormData) {
    return this.http.put<PutProduct>('http://localhost:3006/products', product);
  }

  public  getProductsSearch(
    productSearch: string,
  )  {
    return this.http.get<Array<GetProduct>>(
      `http://localhost:3006/products/${productSearch}`
    );
  }

  public async deleteProduct(id: number): Promise<void> {
    const observable = this.http.delete(this.config.deleteProduct + id);
    await firstValueFrom(observable);

    this.products = this.products.filter(
      (product) => product.id != id
    );
  }
}
