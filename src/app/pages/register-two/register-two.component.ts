import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SecondRegistration } from 'src/app/models/SecondRegistration';
import { UserService } from 'src/app/services/userService/user.service';


@Component({
  selector: 'app-register-two',
  templateUrl: './register-two.component.html',
  styleUrls: ['./register-two.component.css']
})
export class RegisterTwoComponent implements OnInit {

  public tenBigCities: string[] = ["", "Jerusalem", "Tel Aviv", "Haifa", "Petah Tikva", "Rishon Lezion", "Ashdod", "Netanya", "Beer Sheva", "Bnei Brak", "Holon"];
  public formRegistrationSecond: UntypedFormGroup;
  public city: UntypedFormControl;
  public street: UntypedFormControl;
  public firstName: UntypedFormControl;
  public lastName: UntypedFormControl

  constructor(public userRegisterService: UserService, public router: Router) {

    this.city = new UntypedFormControl("", Validators.required)
    this.street = new UntypedFormControl("", Validators.required)
    this.firstName = new UntypedFormControl("", Validators.required)
    this.lastName = new UntypedFormControl("", Validators.required)
    this.formRegistrationSecond = new UntypedFormGroup({ city: this.city, street: this.street, firstName: this.firstName, lastName: this.lastName })
  }

  ngOnInit(): void {

  }

  userRegister() {
    this.userRegisterService.userRegistrationSecondStep = new SecondRegistration({
      firstName:this.firstName.value,
      lastName:this.lastName.value,
      city:this.city.value,
      street:this.street.value
    })

    const obsravable = this.userRegisterService.secondRegisterStep()

    obsravable.subscribe((httpResponseDate) => {
      this.router.navigate(["/login"])
    }, (httpResponseError) => {

    })

  }
}
