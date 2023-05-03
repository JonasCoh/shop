import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }

  register!:string
  isEmailExist!:boolean
  login!:string

  // endpoints
  getOneProduct ="getOneProduct"
  deleteProduct = "deleteProduct"
}
