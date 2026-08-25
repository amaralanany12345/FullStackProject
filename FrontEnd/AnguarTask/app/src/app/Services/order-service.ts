import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderDto } from '../Dtos/order-dto';
import { Order } from '../Models/order';
import { OrderItem } from '../Models/order-item';
import { OrderItemDto } from '../Dtos/order-item-dto';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  
  constructor(private httpClient:HttpClient){}
  
  CreateOrder():Observable<OrderDto>{
    return this.httpClient.post<OrderDto>(`https://localhost:7273/api/orders`,{})
  }
  GetAllOrders():Observable<OrderDto[]>{
    return this.httpClient.get<OrderDto[]>(`https://localhost:7273/api/orders`)
  }
  AddOrderItemToOrder(orderItemDto:OrderItemDto):Observable<OrderItemDto>{
    return this.httpClient.post<OrderItemDto>( `https://localhost:7273/api/orders/orderItems`,orderItemDto)
  }
  DeleteOrderItemFromOrder(itemId:number):Observable<void>{
    return this.httpClient.delete<void>(`https://localhost:7273/api/orders/orderItems/${itemId}`)
  }
  GetOrderItemsById(orderId:number):Observable<OrderItemDto[]>{
    return this.httpClient.get<OrderItemDto[]>(`https://localhost:7273/api/orders/orderItems/${orderId}`)
  }
  GetOrderById(orderId:number):Observable<OrderDto>{
    return this.httpClient.get<OrderDto>(`https://localhost:7273/api/orders/${orderId}`)

  }
  CancelOrder(order:Order):Observable<void>{
    return this.httpClient.put<void>(`https://localhost:7273/api/orders/cancel`,order)
  }
  GetCurrentOrder():Observable<Order>{
    return this.httpClient.get<Order>(`https://localhost:7273/api/orders/current`)

  }
  GetOrderItems():Observable<OrderItem[]>{
    return this.httpClient.get<OrderItem[]>(`https://localhost:7273/api/orders/orderItems`)
  }
  IncreaseOrderItem(OrderItemDto:OrderItemDto):Observable<OrderItemDto>{
    return this.httpClient.put<OrderItemDto>(`https://localhost:7273/api/orders/orderItems/Increase`,OrderItemDto)
  }
  DecreaseOrderItem(OrderItemDto:OrderItemDto):Observable<OrderItemDto>{
    return this.httpClient.put<OrderItemDto>(`https://localhost:7273/api/orders/orderItems/Decrease`,OrderItemDto)
  }

  
}
