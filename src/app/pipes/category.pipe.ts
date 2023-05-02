import { Pipe, PipeTransform } from '@angular/core';
import { GetProduct } from '../models/GetProduct';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {

  transform(products:GetProduct[],categoryName:string): GetProduct[] {
    
    return products.filter((product:GetProduct)=>product.categoryName === categoryName)
  }

}
