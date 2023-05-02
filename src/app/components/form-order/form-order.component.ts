import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderPost } from 'src/app/models/OrderPost';
import { CartProductService } from 'src/app/services/cartproductService/cart-product.service';
import { OrderService } from 'src/app/services/orderService/order.service';
import { UserService } from 'src/app/services/userService/user.service';

@Component({
  selector: 'app-form-order',
  templateUrl: './form-order.component.html',
  styleUrls: ['./form-order.component.css']
})
export class FormOrderComponent implements OnInit {

  public orderForm!: FormGroup;
  public city!: FormControl;
  public address!: FormControl;
  public shippingDate!: FormControl;
  public creditCard!: FormControl;
  public identity!: string;
  public error:string="";
  constructor(public userService: UserService, public cartService: CartProductService,public orderService:OrderService ,public router :Router) {

  }

  ngOnInit(): void {
    this.initilizedForm()
    
  }

  async initilizedForm() {
    try {
      const result: any = await this.getUserInformation();
      console.log(result);
      this.identity = result.identity
      this.address = new FormControl(result?.street);
      this.city = new FormControl(result?.city);
      this.shippingDate = new FormControl("", Validators.required);
      this.creditCard = new FormControl("", [Validators.pattern('[0-9]{16}'), Validators.required])
      this.city.disable()
      this.address.disable()
      this.orderForm = new FormGroup({ address: this.address, city: this.city, shippingDate: this.shippingDate, creditCard: this.creditCard })
    
    } catch (e) {
      console.log(e)
    }
  }


  getUserInformation() {
    const observable = this.userService.getUserDetails();
    return new Promise((resolve, reject) => {
      observable.subscribe((HttpResponseData) => { resolve(HttpResponseData) })
    })
  }

  makeOrder() {
    const userCartId = this.cartService.userCartId.id;
    const fourDigitCreditCard = this.creditCard.value.toString().slice(-4);    
    const order: OrderPost = new OrderPost(this.identity, userCartId, this.cartService.cartPriceTotal, this.city.value, this.address.value, this.shippingDate.value,fourDigitCreditCard);
    
    const observable = this.orderService.makeOrder(order)

    observable.subscribe((HttpResponseData)=>{
      this.error=""
      this.router.navigate(["order/user/successful"])
    },(HttpErrorData)=>{
      this.error =HttpErrorData.error.error
    })


  }



}
