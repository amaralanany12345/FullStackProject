import { Component, OnInit, signal } from '@angular/core';
import { ReceiptService } from '../../Services/receipt-service';
import { ReceiptDto } from '../../Dtos/receipt-dto';
import { Router } from '@angular/router';
import { OrderService } from '../../Services/order-service';

@Component({
  selector: 'app-all-receipts-component',
  // imports: [],
  templateUrl: './all-receipts-component.html',
  styleUrl: './all-receipts-component.css',
  standalone:false
})
export class AllReceiptsComponent implements OnInit {

  allReceipts=signal<ReceiptDto[]>([])
  error=signal<string>('')
  constructor(private receiptService:ReceiptService,private router:Router,private orderService:OrderService){}
  
  ngOnInit(): void {
    this.receiptService.GetAllReciepts().subscribe({
      next:(res)=>{
        this.allReceipts.set(res)
      },
      error:(err:Error)=>{
        this.error.set(err.message)
      }
    })
  }

  viewDetials(orderId:number){
    this.router.navigate(['home/receipts',orderId])
  }

}
