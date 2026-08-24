import { Component, input, OnInit, output, signal } from '@angular/core';
import { OrderDto } from '../../Dtos/order-dto';
import { OrderService } from '../../Services/order-service';
import { OrderItemDto } from '../../Dtos/order-item-dto';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from '../../Services/payment-service';
import { ReceiptDto } from '../../Dtos/receipt-dto';
import { CartItemDetails } from "../cart-item-details/cart-item-details";

@Component({
  selector: 'app-order-details',
  imports: [CartItemDetails],
  templateUrl: './order-details.html',
  styleUrl: './order-details.css',
})
export class OrderDetails implements OnInit {



  order=signal<OrderDto|null>(null)
  totalPrice=signal<number>(0)
  orderCartItems=signal<OrderItemDto[]>([])

  constructor(private orderService:OrderService,private activatedRoute:ActivatedRoute,
  private paymentService:PaymentService,private router:Router){}
  ngOnInit(): void {
    const orderId=Number(this.activatedRoute.snapshot.paramMap.get('id'))
    this.orderService.GetOrderItemsById(orderId).subscribe({
      next:(res)=>{
        this.orderCartItems.set(res)
      }
    })
  }
}
