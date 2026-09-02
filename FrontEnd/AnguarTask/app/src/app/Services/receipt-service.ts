import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReceiptDto } from '../Dtos/receipt-dto';
import { SKIP_AUTH } from '../SKIP_AUTH';

@Injectable()
// @Injectable({
//   providedIn: 'root',
// })
export class ReceiptService {

  constructor(private httpClient:HttpClient){}

  GetAllReciepts():Observable<ReceiptDto[]>{
    const newHttpContext=new HttpContext().set(SKIP_AUTH,false)
    return this.httpClient.get<ReceiptDto[]>(`https://localhost:7273/api/Receipt`,{context:newHttpContext})
  }
  GetRecieptByOrderId(orderId:number):Observable<ReceiptDto>{
    const newHttpContext=new HttpContext().set(SKIP_AUTH,false)
    return this.httpClient.get<ReceiptDto>(`https://localhost:7273/api/Receipt/${orderId}`,{context:newHttpContext})
  }
  
}
