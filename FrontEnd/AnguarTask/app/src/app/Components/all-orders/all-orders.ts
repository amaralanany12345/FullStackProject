import { Component, NgModule, OnInit, signal } from '@angular/core';
import { Order } from '../../Models/order';
import { OrderService } from '../../Services/order-service';
import { OrderDto } from '../../Dtos/order-dto';
import { OrderItemDto } from '../../Dtos/order-item-dto';
import { Router, RouterModule } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';


@Component({
  selector: 'app-all-orders',
  imports:[ScrollingModule],
  templateUrl: './all-orders.html',
  styleUrl: './all-orders.css',
}) 
export class AllOrders implements OnInit {
  constructor(private orderService:OrderService,private router:Router){}
  orders=signal<OrderDto[]>([])
  orderItems=signal<OrderItemDto[]>([])
  ngOnInit(): void {
    this.orderService.GetAllOrders().subscribe({
      next:(res)=>{
        this.orders.set(res)
      } 
    })
  }

  ViewDetails(orderId:number){
    this.router.navigate(['home/orders',orderId])
  }

}
