import { Component, OnInit, signal } from '@angular/core';
import { UserService } from '../../Services/user-service';
import { OrderService } from '../../Services/order-service';
import { ItemDto } from '../../Dtos/item-dto';
import { ItemService } from '../../Services/item-service';
import { OrderItemDto } from '../../Dtos/order-item-dto';
import { Router } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { User } from '../../Models/user';
import { OrderItem } from '../../Models/order-item';

@Component({
  selector: 'app-apply-order',
  imports: [FormsModule],
  templateUrl: './apply-order.html',
  styleUrl: './apply-order.css',
})
export class ApplyOrder implements OnInit {

  allItems=signal<ItemDto[]>([])
  allOrderItems=signal<OrderItem[]>([])
  constructor(private userService:UserService,private itemService:ItemService,
    private orderService:OrderService,private router:Router){}
  
  ngOnInit(): void {
    this.orderService.GetOrderItems().subscribe({
      next:(res)=>{
        this.allOrderItems.set(res)
        console.log(this.allOrderItems())
      }
    })
    this.itemService.GetAllItems().subscribe({
      next:(res)=>{
        this.allItems.set(res)
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  AddItemToOrder(orderItem:ItemDto){
    const newOrderItemDto:OrderItemDto={} as OrderItemDto
    
    // this.router.navigateByUrl('')
  }

}
