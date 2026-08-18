import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Wallet } from '../Models/wallet';
import { ReceiptDto } from '../Dtos/receipt-dto';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {

  constructor(private httpClient:HttpClient){}

  ApplyPayment():Observable<ReceiptDto>{
    return this.httpClient.post<ReceiptDto>(`https://localhost:7273/api/Payment`,{})
  }
  
}
