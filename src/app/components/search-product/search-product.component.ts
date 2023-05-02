import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductsService } from 'src/app/services/productService/products.service';



@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css']
})
export class SearchProductComponent implements OnInit {
  @Output() searchProducts = new EventEmitter();
  @Output() colorOrder = new EventEmitter();
  public searchProduct: string = "";


  constructor(public productService: ProductsService) { }

  ngOnInit(): void {
  }

  searchProductOnServer() {
    
      this.searchProducts.emit(this.searchProduct);
      
        this.colorOrder.emit(this.searchProduct);
      
      
    

  }
}
