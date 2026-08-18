import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../Services/order-service';

@Component({
  selector: 'app-order-item',
  imports: [],
  templateUrl: './order-item.html',
  styleUrl: './order-item.css',
})
export class OrderItem implements OnInit {

  constructor(private orderService:OrderService){}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
