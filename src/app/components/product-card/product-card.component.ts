import { Component, Input, OnInit } from '@angular/core';
import { GetProduct } from 'src/app/models/GetProduct';


@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input()
  product!: GetProduct;
  
  constructor() { }
  

  ngOnInit(): void {
    
  }

  
  

}
