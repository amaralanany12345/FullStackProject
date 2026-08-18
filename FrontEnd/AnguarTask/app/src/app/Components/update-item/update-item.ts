import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder,FormControl,FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';
import { ItemService } from '../../Services/item-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../../Models/item';
import { ItemDto } from '../../Dtos/item-dto';
import { Location } from '@angular/common';

@Component({
  selector: 'app-update-item',
  imports: [ReactiveFormsModule],
  templateUrl: './update-item.html',
  styleUrl: './update-item.css',
})
export class UpdateItem implements OnInit {

  private formBuilder=inject(FormBuilder)
  item=signal<ItemDto| null>(null)
  itemId:number={} as number
  // updateItemDto:ItemDto={} as ItemDto
  // updateItem:FormBuilder={} as FormBuilder
  constructor(private itemService:ItemService,private activatedRoute:ActivatedRoute,
    private router:Router){}
  ngOnInit(): void {
    const itemId=Number(this.activatedRoute.snapshot.paramMap.get('id'))
    this.itemService.GetItemById(itemId).subscribe({
      next:(res)=>{
        this.item.set(res)
        this.updateItem.patchValue({
          id: res.id,
          name: res.name,
          price: res.price,
          stockQuantity: res.stockQuantity,
          categoryName: res.categoryName
        })
      }
    })
  }
  updateItem=this.formBuilder.nonNullable.group({
    
    id:[0,Validators.required],
    name:["",[Validators.required,Validators.minLength(3)]],
    price:[0,Validators.required],
    stockQuantity:[0,Validators.required],
    categoryName:['',Validators.required]
  })

  UpdateItem(){
    const updateItemDto:ItemDto={} as ItemDto
    updateItemDto.id=this.updateItem.getRawValue().id
    updateItemDto.name=this.updateItem.getRawValue().name
    updateItemDto.price=this.updateItem.getRawValue().price
    updateItemDto.stockQuantity=this.updateItem.getRawValue().stockQuantity
    updateItemDto.categoryName=this.updateItem.getRawValue().categoryName
    this.itemService.UpdateItemById(updateItemDto).subscribe({
      next:()=>{
        this.router.navigate(['home'])
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
}
