import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirstRegistration } from 'src/app/models/FirstRegistration';
import {  UserService } from 'src/app/services/userService/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  public registerFirstStep: FormGroup;
  public userName: FormControl;
  public password: FormControl;
  public identity: FormControl;
  public conformPassword: FormControl;
  public errorFromHttpRequest: string = "";


  constructor(public userRegisterService: UserService, public router: Router) {
    this.userName = new FormControl("", [Validators.required, Validators.pattern("[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*")])
    this.identity = new FormControl("", [Validators.required, Validators.pattern("[0-9]{9}")])
    this.password = new FormControl("", [Validators.minLength(8), Validators.maxLength(12), Validators.required])
    this.conformPassword = new FormControl("", [Validators.minLength(8), Validators.maxLength(12), Validators.required,])
    this.registerFirstStep = new FormGroup({ userName: this.userName, password: this.password, identity: this.identity, conformPassword: this.conformPassword })
  }

  ngOnInit(): void {


  }

  registerStepOne() {

    this.userRegisterService.userRegisterFirstStep =new FirstRegistration({
      identity:this.identity.value,
      userName:this.userName.value,
      password:this.password.value
    })

    this.userRegisterService.firstRegisterStep(this.userName)
    .subscribe(httpResponseData => {
      this.errorFromHttpRequest = ""
      this.router.navigate(["register/2"])
    }, httpResponseError => {
      this.errorFromHttpRequest = httpResponseError.error.error
    })
  }

}
