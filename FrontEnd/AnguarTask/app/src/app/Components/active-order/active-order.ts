import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { OrderService } from '../../Services/order-service';
import { OrderItemDto } from '../../Dtos/order-item-dto';
import { OrderDto } from '../../Dtos/order-dto';
import { PaymentService } from '../../Services/payment-service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItemDetails } from "../cart-item-details/cart-item-details";

@Component({
  selector: 'app-active-order',
  imports: [CartItemDetails],
  templateUrl: './active-order.html',
  styleUrl: './active-order.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ActiveOrder implements OnInit {

  order=signal<OrderDto|null>(null)
  totalPrice=signal<number>(0)
  orderCartItems=signal<OrderItemDto[]>([])
  constructor(private orderService:OrderService,private activatedRoute:ActivatedRoute,
  private paymentService:PaymentService,private router:Router){}
  ngOnInit(): void {
    const orderId=Number(this.activatedRoute.snapshot.paramMap.get('orderId'))
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
    this.router.navigate(['home/paymentPage',this.order()?.id])
  }

}
