import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirstRegistration } from 'src/app/models/FirstRegistration';
import {  UserService } from 'src/app/services/userService/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  public registerFirstStep: UntypedFormGroup;
  public userName: UntypedFormControl;
  public password: UntypedFormControl;
  public identity: UntypedFormControl;
  public conformPassword: UntypedFormControl;
  public errorFromHttpRequest: string = "";


  constructor(public userRegisterService: UserService, public router: Router) {
    this.userName = new UntypedFormControl("", [Validators.required, Validators.pattern("[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*")])
    this.identity = new UntypedFormControl("", [Validators.required, Validators.pattern("[0-9]{9}")])
    this.password = new UntypedFormControl("", [Validators.minLength(8), Validators.maxLength(12), Validators.required])
    this.conformPassword = new UntypedFormControl("", [Validators.minLength(8), Validators.maxLength(12), Validators.required,])
    this.registerFirstStep = new UntypedFormGroup({ userName: this.userName, password: this.password, identity: this.identity, conformPassword: this.conformPassword })
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
