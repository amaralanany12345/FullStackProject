import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Wallet } from '../Models/wallet';
import { ReceiptDto } from '../Dtos/receipt-dto';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  httpOption
  constructor(private httpClient:HttpClient){
    this.httpOption={
      headers:{
        "Idempotency-Key":Math.random().toString(36).substring(1,6)
        // crypto.randomUUID()
        
      }
    }
  }

  ApplyPayment():Observable<ReceiptDto>{
    return this.httpClient.post<ReceiptDto>(`https://localhost:7273/api/Payment`,{},this.httpOption)
  }
  
}
