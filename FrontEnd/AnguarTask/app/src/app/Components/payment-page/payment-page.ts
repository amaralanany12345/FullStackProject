import { Component, OnInit, signal } from '@angular/core';
import { ReceiptDto } from '../../Dtos/receipt-dto';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from '../../Services/payment-service';
import { OrderDto } from '../../Dtos/order-dto';
import { OrderItemDto } from '../../Dtos/order-item-dto';
import { OrderService } from '../../Services/order-service';
import { CartItemDetails } from "../cart-item-details/cart-item-details";

@Component({
  selector: 'app-payment-page',
  imports: [CartItemDetails],
  templateUrl: './payment-page.html',
  styleUrl: './payment-page.css',
})
export class PaymentPage implements OnInit {
  order=signal<OrderDto|null>(null)
  orderItems=signal<OrderItemDto[]>([])
  constructor(private router:Router,private orderService:OrderService,private activatedroute:ActivatedRoute,private paymentService:PaymentService){}
  ngOnInit(): void {
    const orderId=Number(this.activatedroute.snapshot.paramMap.get('orderId'))
    this.orderService.GetCurrentOrder().subscribe({
      next:(res)=>{
        this.order.set(res)
      }
    })
    this.orderService.GetOrderItemsById(orderId).subscribe({
      next:(res)=>{
        this.orderItems.set(res)
      }
    })
  }

  ConfirmPayment(){
    this.paymentService.ApplyPayment().subscribe({
      next:(res)=>{
        this.router.navigateByUrl('home')
      },
      error:(err:Error)=>{
        console.log(err.message)
      }
    })
  }

}
