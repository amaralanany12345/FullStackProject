import { HttpClient, HttpContext, HttpContextToken } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Wallet } from '../Models/wallet';
import { ReceiptDto } from '../Dtos/receipt-dto';
import { SKIP_AUTH } from '../SKIP_AUTH';

@Injectable()
export class PaymentService {
  constructor(private httpClient:HttpClient){}
  
  ApplyPayment():Observable<ReceiptDto>{
    const httpOption={
    headers:{
        "Idempotency-Key":Math.random().toString(36).substring(2,7)
      }, 
    }
    const newHttpContext=new HttpContext().set(SKIP_AUTH,false)
    return this.httpClient.post<ReceiptDto>(`https://localhost:7273/api/Payment`,{},{headers:httpOption.headers,context:newHttpContext})
  }
  
}
