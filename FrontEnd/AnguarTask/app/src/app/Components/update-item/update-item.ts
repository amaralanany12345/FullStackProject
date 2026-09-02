import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder,FormControl,FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';
import { ItemService } from '../../Services/item-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../../Models/item';
import { ItemDto } from '../../Dtos/item-dto';
import { Location } from '@angular/common';
import { CategoryService } from '../../Services/category-service';
import { CategoryDto } from '../../Dtos/category-dto';
import { FormInput } from "../form-input/form-input";

@Component({
  selector: 'app-update-item',
  imports: [ReactiveFormsModule, FormInput],
  templateUrl: './update-item.html',
  styleUrl: './update-item.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class UpdateItem implements OnInit {

  private formBuilder=inject(FormBuilder)
  item=signal<ItemDto| null>(null)
  allCategories=signal<CategoryDto[]>([])
  constructor(private itemService:ItemService,private activatedRoute:ActivatedRoute,
  private location:Location,private categoryService:CategoryService){}
  ngOnInit(): void {
    const itemId=Number(this.activatedRoute.snapshot.paramMap.get('id'))
    this.itemService.GetItemById(itemId).subscribe({
      next:(res)=>{
        this.item.set(res)
        this.updateItemForm.patchValue({
          id: res.id,
          name: res.name,
          price: res.price,
          stockQuantity: res.stockQuantity,
          categoryName: res.categoryName
        })
      }
    })
    this.categoryService.GetAllCategories().subscribe({
      next:(res)=>{
        this.allCategories.set(res)
      }
    })
  }
  updateItemForm=this.formBuilder.nonNullable.group({
    
    id:[0,Validators.required],
    name:["",[Validators.required,Validators.minLength(3)]],
    price:[0,Validators.required],
    stockQuantity:[0,Validators.required],
    categoryName:['',Validators.required]
  })

  UpdateItem(){
    const updateItemDto=this.updateItemForm.getRawValue()
    this.itemService.UpdateItemById(updateItemDto).subscribe({
      next:()=>{
        this.location.back()
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
}
