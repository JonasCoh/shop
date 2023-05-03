import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { observable } from 'rxjs';
import { CredentialsModel } from 'src/app/models/credentials.model';
import { MarketService } from 'src/app/services/marketService/market.service';
import { UserService } from 'src/app/services/userService/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public productsInStore:number =0;
  public ordersInStore:number = 0;
  public loginUser!: UntypedFormGroup;
  public userName!: UntypedFormControl;
  public password!: UntypedFormControl;
  public error: string ="";

  constructor(public userOperation: UserService,public router : Router,public marketInfo :MarketService) {
    this.userName = new UntypedFormControl("",[Validators.required,Validators.email]);
    this.password = new UntypedFormControl("",[Validators.required,Validators.minLength(8),Validators.maxLength(12)]);
    this.loginUser = new UntypedFormGroup({userName:this.userName,password: this.password});
   }

  ngOnInit( ): void {
    const observable = this.marketInfo.getMarketInformation()
    observable.subscribe((HttpResponseData)=>{
      console.log(HttpResponseData);
      const [storeIformation]:any =HttpResponseData;
      this.productsInStore = storeIformation.products;
      this.ordersInStore = storeIformation.orders;
    },(HttpResponseError)=>{
      console.log(HttpResponseError)
    })




  }

  login(){
    const user = new CredentialsModel({
      userName:this.userName.value,
      password:this.password.value
    })
    console.log(user)
    const observable = this.userOperation.authenticateUser(user)

    observable.subscribe((httpResponseData:any)=>{
      this.error ="";
      const token = "Bearer " + httpResponseData.token
      sessionStorage.setItem("token",token)
      if(httpResponseData.isAdmin == 0){
        this.router.navigate(["/products/user"])
      }else {
        this.router.navigate(["/products/admin"])
      }

    },(httpResponseError)=>{
      this.error = httpResponseError.error.error;
    })
  }

}
