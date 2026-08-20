import { Component, inject, OnInit, signal } from '@angular/core';
import { ItemService } from '../../Services/item-service';
import { CategoryService } from '../../Services/category-service';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ItemDto } from '../../Dtos/item-dto';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { CategoryDto } from '../../Dtos/category-dto';

@Component({
  selector: 'app-create-item',
  imports: [ReactiveFormsModule,FormsModule],
  templateUrl: './create-item.html',
  styleUrl: './create-item.css',
})
export class CreateItem implements OnInit {

  private formBuilder=inject(FormBuilder)
  allCategories=signal<CategoryDto[]>([])
  constructor(private itemService:ItemService,private location:Location,private router:Router,private categoryService:CategoryService){}
  ngOnInit(): void {
    this.categoryService.GetAllCategories().subscribe({
      next:(res)=>{
        this.allCategories.set(res)
      }
    })
  }

  createItemForm=this.formBuilder.nonNullable.group({
    name: ['',[Validators.required,Validators.minLength(3)]],
    price: [0,Validators.required],
    stockQuantity: [0,Validators.required],
    categoryName: ['',Validators.required]
  })
  

  CreateItem(){
    const itemDto:ItemDto={} as ItemDto
    itemDto.name=this.createItemForm.getRawValue().name
    itemDto.price=this.createItemForm.getRawValue().price
    itemDto.stockQuantity=this.createItemForm.getRawValue().stockQuantity
    itemDto.categoryName=this.createItemForm.getRawValue().categoryName
    this.itemService.CreateItem(itemDto).subscribe({
      next:(res)=>{
        this.location.back()
      }
    })
  }

}
