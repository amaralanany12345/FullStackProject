import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReceiptDto } from '../Dtos/receipt-dto';

@Injectable({
  providedIn: 'root',
})
export class ReceiptService {

  constructor(private httpClient:HttpClient){}

  GetAllReciepts():Observable<ReceiptDto[]>{
    return this.httpClient.get<ReceiptDto[]>(`https://localhost:7273/api/Receipt`)
  }
  GetRecieptByOrderId(orderId:number):Observable<ReceiptDto>{
    return this.httpClient.get<ReceiptDto>(`https://localhost:7273/api/Receipt/${orderId}`)
  }
  
}
