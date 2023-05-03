import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { FirstRegistration } from 'src/app/models/FirstRegistration';
import { SecondRegistration } from 'src/app/models/SecondRegistration';
import { CredentialsModel } from 'src/app/models/credentials.model';
import {map} from "rxjs/operators";

import { firstValueFrom } from 'src/app/util/firstValueFrom';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  public user: any;
  private token!: string;

  public userRegisterFirstStep!: FirstRegistration;
  public userRegistrationSecondStep!: SecondRegistration;

  constructor(
    private http:HttpClient,
    private config: ConfigService,
   ){
    const token = window.localStorage.getItem('token')
    if( token ) this.setUser(token)
  }

public  firstRegisterStep( user: any ){
        return this.http.post<string>( this.config.register, user )
        .pipe(
          map((token)=>{
            this.setUser(token)
          })
        )


    }

    public async isEmailExist(email: string): Promise<boolean> {
      const observable = this.http.get<boolean>( this.config.isEmailExist + email );
      return firstValueFrom(observable);
  }

  secondRegisterStep(){
    const userRegister = {...this.userRegisterFirstStep,...this.userRegistrationSecondStep}
    return this.http.post("http://localhost:3006/users/",userRegister)
  }

  public authenticateUser( credentials: CredentialsModel) {
    return  this.http.post<string>( this.config.login, credentials )
    .pipe(
      map((token)=>{
        this.setUser(token)
      })
    )

}


  getUserDetails(){
    return this.http.get("http://localhost:3006/users/");
  }

  private setUser(token: string):void{
    this.token = token;
    window.localStorage.setItem('token', token );
    const decode: any = jwtDecode( token )
    this.user = decode.user;
}
}
function tap(arg0: () => void): import("rxjs").OperatorFunction<string, unknown> {
  throw new Error('Function not implemented.');
}

