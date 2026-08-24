import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../Services/order-service';
import { ReceiptService } from '../../Services/receipt-service';
import { ReceiptDto } from '../../Dtos/receipt-dto';
import { OrderItemDto } from '../../Dtos/order-item-dto';
import { CartItemDetails } from "../cart-item-details/cart-item-details";

@Component({
  selector: 'app-receipt-component',
  imports: [CartItemDetails],
  templateUrl: './receipt-component.html',
  styleUrl: './receipt-component.css',
})
export class ReceiptComponent implements OnInit {

  receipt=signal<ReceiptDto|null>(null)
  receiptOrderDetails=signal<OrderItemDto[]>([])
  constructor(private activatedRoute:ActivatedRoute,private orderService:OrderService,private receiptService:ReceiptService){}
  ngOnInit(): void {
    const receiptOrderId=Number(this.activatedRoute.snapshot.paramMap.get('id'))

    this.receiptService.GetRecieptByOrderId(receiptOrderId).subscribe({
      next:(res)=>{
        this.receipt.set(res)
        this.orderService.GetOrderItemsById(res.orderId).subscribe({
          next:(val)=>{
            this.receiptOrderDetails.set(val)
          }
        })
      }
    })
  }

}
