import { Component, OnInit, signal } from '@angular/core';
import { OrderDto } from '../../Dtos/order-dto';
import { OrderService } from '../../Services/order-service';
import { OrderItemDto } from '../../Dtos/order-item-dto';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from '../../Services/payment-service';
import { ReceiptDto } from '../../Dtos/receipt-dto';

@Component({
  selector: 'app-order-details',
  imports: [],
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
    this.orderService.GetCurrentOrder().subscribe({
      next:(res)=>{
        this.order.set(res)
        this.totalPrice.set(res.totalAmount)
      }
    })
    this.orderService.GetOrderItemsById(orderId).subscribe({
      next:(res)=>{
        this.orderCartItems.set(res)
      }
    })
  }

  DeleteCartItem(itemId:number){
    this.orderService.DeleteOrderItemFromOrder(itemId).subscribe({
      next:(res)=>{
        this.orderCartItems.update(a=>a.filter(a=>a.itemId!=itemId))
        this.GetTotalOrderPrice()
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
  
  Increase(item:OrderItemDto){
    this.orderService.IncreaseOrderItem(item).subscribe({
      next:(res)=>{
        this.orderCartItems.update(a=>a.map(b=>b.itemId==item.itemId 
          ? {...b,quantity:res.quantity} : b))
        this.GetTotalOrderPrice()
      }
    })
  }

  Decrease(item:OrderItemDto){
     this.orderService.DecreaseOrderItem(item).subscribe({
      next:(res)=>{
        this.orderCartItems.update(a=>a.map(b=>b.itemId==item.itemId 
          ? {...b,quantity:res.quantity} : b))
          this.GetTotalOrderPrice()
    },
      error:(err:Error)=>{
        console.log(err.message)
      }
    })
  }

  GetTotalOrderPrice(){
     this.orderService.GetCurrentOrder().subscribe({
        next:(res)=>{
          this.totalPrice.set(res.totalAmount)
        }
      })
      return this.totalPrice()
  }

  ApplyPayment(){
    const receiptDto:ReceiptDto={} as ReceiptDto
    receiptDto.totalAmount=this.totalPrice()
    console.log(receiptDto)
    console.log(this.order())
    this.paymentService.ApplyPayment().subscribe({
      next:(res)=>{
        this.router.navigateByUrl('home')
      },
      error:(err:Error)=>{
        console.log("ammar")
        console.log(err.message)
      }
    })
  }
}
