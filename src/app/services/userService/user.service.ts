import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { FirstRegistration } from 'src/app/models/FirstRegistration';
import { SecondRegistration } from 'src/app/models/SecondRegistration';
import { UserLogin } from 'src/app/models/credentials.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  
  public user: User;
  private token: string;

  public userRegisterFirstStep!: FirstRegistration;
  public userRegistrationSecondStep!: SecondRegistration;

  constructor(private http:HttpClient,private config: ConfigService, private router : Router ){ 
    const token = window.localStorage.getItem('token')
    if( token ) this.setUser(token)
  } 

public async firstRegisterStep( user: User ): Promise<void> {
        const observable = this.http.post<string>( this.config.register, user );
        const token = await firstValueFrom(observable);
        this.setUser(token)
    }

    public async isEmailExist(email: string): Promise<boolean> {
      const observable = this.http.get<boolean>( this.config.isEmailExist + email );
      return firstValueFrom(observable);
  }

  secondRegisterStep(){
    const userRegister = {...this.userRegisterFirstStep,...this.userRegistrationSecondStep}
    return this.http.post("http://localhost:3006/users/",userRegister)
  }

  public async Userlogin( credentials: CredentialsModel): Promise<void> {
    const observable = this.http.post<string>( this.config.login, credentials );
    const token = await firstValueFrom(observable);
    this.setUser(token)
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
