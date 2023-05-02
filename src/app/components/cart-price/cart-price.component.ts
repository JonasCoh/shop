import { Component, OnInit } from '@angular/core';
import { CartProductService } from 'src/app/services/cartproductService/cart-product.service';

@Component({
  selector: 'app-cart-price',
  templateUrl: './cart-price.component.html',
  styleUrls: ['./cart-price.component.css']
})
export class CartPriceComponent implements OnInit {

  constructor(public cartService:CartProductService) { }

  ngOnInit(): void {
  }

}
