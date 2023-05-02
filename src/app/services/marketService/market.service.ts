import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MarketService {

  constructor(private http :HttpClient) { }

  getMarketInformation(){
    return this.http.get("http://localhost:3006/market");
  }
}
