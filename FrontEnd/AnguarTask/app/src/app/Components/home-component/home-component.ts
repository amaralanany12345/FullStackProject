import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../Services/user-service';
import { ItemService } from '../../Services/item-service';
import { Item } from '../../Models/item';
import { ItemDto } from '../../Dtos/item-dto';
import { UserDto } from '../../Dtos/user-dto';
import { User } from '../../Models/user';
import { OrderService } from '../../Services/order-service';
import { Order } from '../../Models/order';
import { OrderItemDto } from '../../Dtos/order-item-dto';
import { OrderDto } from '../../Dtos/order-dto';
import { CategoryService } from '../../Services/category-service';
import { CategoryDto } from '../../Dtos/category-dto';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { interval, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-home-component',
  imports: [ReactiveFormsModule,FormsModule],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css',
})
export class HomeComponent implements OnInit {

  items=signal<ItemDto[]>([])
  selectedItemsByCategory=signal<ItemDto[]>([])
  selectedCategory=signal<CategoryDto|null>(null)
  categories=signal<CategoryDto[]>([])
  currentUser=signal<User |null >(null)
  currentOrder=signal<OrderDto|null>(null)
  searchValue=''
  constructor(private router:Router,private userService:UserService,
  private itemService:ItemService,private categoryService:CategoryService,private orderService:OrderService){}
  ngOnInit(): void {

    interval(30000).pipe(startWith(0), switchMap(() => this.itemService.GetAllItems())).subscribe({
      next:(res)=>{
        this.items.set(res)
      }
    });
    this.categoryService.GetAllCategories().subscribe({
      next:(res)=>{
        this.categories.set(res)
      },
      error:(err:Error)=>{

      }
    })
    this.orderService.GetCurrentOrder().subscribe({
      next:(res)=>{
        this.currentOrder.set(res)
      },
      error:(err)=>{
        if (err.status === 404) {
          this.orderService.CreateOrder().subscribe({
            next: (order) => {
              this.currentOrder.set(order);
            },
            error: (createError) => {
              console.log(createError);
            }
          });
        }
          // this.orderService.CreateOrder().subscribe({
          //   next:(val)=>{
          //   }
          // })
      }
    })
    
    this.userService.GetCurrentUser().subscribe({
      next:(res)=>{
        this.currentUser.set(res)
      },
      error:(err)=>{
        // alert("please refresh token")
        // console.log(this.currentUser())
        // this.userService.RefreshToken(this.userService.userEmail()).subscribe({
        //   next:(res)=>{
        //     console.log(res)
        //   }
        // })
        console.log('GetCurrentUser failed');
        console.log('Status:', err.status);
        console.log('Error:', err);
        // console.log("current user is nont found")
      }
    })
  }

  ViewDetails(itemId:number){
    this.router.navigate(['items',itemId])
  }

  UpdateItem(itemId:number){
    this.router.navigate(['updateItem',itemId])
    
  }
  DeleteItem(itemId:number){
    this.itemService.DeleteItemById(itemId).subscribe({
      next:()=>{
        this.items.update(a=> a.filter(b=>b.id!==itemId))
      }
    })
  }

  GetItemsByCategory(categoyId:number){   
    // this.selectedCategoryId.set(categoyId) 
    this.itemService.GetItemsByCategoryId(categoyId).subscribe({
      next:(res)=>{
        this.items.set(res)
        // this.selectedItemsByCategory.set(res)
      },
      error:(err)=>{
        console.log(err)
      },
    })
  }

  GetAllOrders(){  
    this.router.navigateByUrl("orders")
  }

  ApplyOrder(){
    this.router.navigateByUrl('applyOrder')
  }

  GetOrderDetails(){
    this.orderService.GetCurrentOrder().subscribe({
      next:(res)=>{
        this.router.navigate(['orders',res.id])
      }
    })
  }

  AddToCart(item:ItemDto){
    const orderItemDto:OrderItemDto={} as OrderItemDto
    orderItemDto.itemId=item.id
    orderItemDto.price=item.price
    this.orderService.AddOrderItemToOrder(orderItemDto).subscribe({
      next:(res)=>{
        this.router.navigate(['orders',this.currentOrder()?.id])
        
      }
    })
  }

  SearchAboutItem(){
    this.itemService.SearchAboutItem(this.searchValue).subscribe({
      next:(res)=>{
        this.items.set(res)
        // console.log(res)
      }
    })
  }

  Signout(){
    console.log(this.currentUser())
    this.userService.SignOut().subscribe({
      next:(res)=>{
        this.router.navigateByUrl('')
      }
    })
  }

}
