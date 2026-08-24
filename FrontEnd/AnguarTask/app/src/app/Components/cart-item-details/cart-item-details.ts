import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { OrderItemDto } from '../../Dtos/order-item-dto';
import { ItemDto } from '../../Dtos/item-dto';

@Component({
  selector: 'app-cart-item-details',
  imports: [],
  templateUrl: './cart-item-details.html',
  styleUrl: './cart-item-details.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class CartItemDetails {

  cartItem=input.required<OrderItemDto>()

  deleteItem=output<number>()
  increaseItemQuantity=output<OrderItemDto>()
  decreaseItemQuantity=output<OrderItemDto>()
  mode=input<"view"|"shop">("view")


  onDeleteItem(){
    this.deleteItem.emit(this.cartItem().itemId)
  }
  onIncreaseItemQuantity(){
    this.increaseItemQuantity.emit(this.cartItem())
  }
  onDecreaseItemQuantity(){
    this.decreaseItemQuantity.emit(this.cartItem())
  }

}
