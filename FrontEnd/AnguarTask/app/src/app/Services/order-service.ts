import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderDto } from '../Dtos/order-dto';
import { Order } from '../Models/order';
import { OrderItem } from '../Models/order-item';
import { OrderItemDto } from '../Dtos/order-item-dto';
import { SKIP_AUTH } from '../SKIP_AUTH';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  
  constructor(private httpClient:HttpClient){}
  
  CreateOrder():Observable<OrderDto>{
    const newHttpContext=new HttpContext().set(SKIP_AUTH,false)
    return this.httpClient.post<OrderDto>(`https://localhost:7273/api/orders`,{},{context:newHttpContext})
  }
  GetAllOrders():Observable<OrderDto[]>{
    const newHttpContext=new HttpContext().set(SKIP_AUTH,false)
    return this.httpClient.get<OrderDto[]>(`https://localhost:7273/api/orders`,{context:newHttpContext})
  }
  AddOrderItemToOrder(orderItemDto:OrderItemDto):Observable<OrderItemDto>{
    const newHttpContext=new HttpContext().set(SKIP_AUTH,false)
    return this.httpClient.post<OrderItemDto>( `https://localhost:7273/api/orders/orderItems`,orderItemDto,{context:newHttpContext})
  }
  DeleteOrderItemFromOrder(itemId:number):Observable<void>{
    const newHttpContext=new HttpContext().set(SKIP_AUTH,false)
    return this.httpClient.delete<void>(`https://localhost:7273/api/orders/orderItems/${itemId}`,{context:newHttpContext})
  }
  GetOrderItemsById(orderId:number):Observable<OrderItemDto[]>{
    const newHttpContext=new HttpContext().set(SKIP_AUTH,false)
    return this.httpClient.get<OrderItemDto[]>(`https://localhost:7273/api/orders/orderItems/${orderId}`,{context:newHttpContext})
  }
  GetOrderById(orderId:number):Observable<OrderDto>{
    const newHttpContext=new HttpContext().set(SKIP_AUTH,false)
    return this.httpClient.get<OrderDto>(`https://localhost:7273/api/orders/${orderId}`,{context:newHttpContext})
  }
  CancelOrder(order:Order):Observable<void>{
    const newHttpContext=new HttpContext().set(SKIP_AUTH,false)
    return this.httpClient.put<void>(`https://localhost:7273/api/orders/cancel`,order,{context:newHttpContext})
  }
  GetCurrentOrder():Observable<Order>{
    const newHttpContext=new HttpContext().set(SKIP_AUTH,false)
    return this.httpClient.get<Order>(`https://localhost:7273/api/orders/current`,{context:newHttpContext})
  }
  GetOrderItems():Observable<OrderItem[]>{
    const newHttpContext=new HttpContext().set(SKIP_AUTH,false)
    return this.httpClient.get<OrderItem[]>(`https://localhost:7273/api/orders/orderItems`,{context:newHttpContext})
  }
  IncreaseOrderItem(OrderItemDto:OrderItemDto):Observable<OrderItemDto>{
    const newHttpContext=new HttpContext().set(SKIP_AUTH,false)
    return this.httpClient.put<OrderItemDto>(`https://localhost:7273/api/orders/orderItems/Increase`,OrderItemDto,{context:newHttpContext})
  }
  DecreaseOrderItem(OrderItemDto:OrderItemDto):Observable<OrderItemDto>{
    const newHttpContext=new HttpContext().set(SKIP_AUTH,false)
    return this.httpClient.put<OrderItemDto>(`https://localhost:7273/api/orders/orderItems/Decrease`,OrderItemDto,{context:newHttpContext})
  }

  
}
