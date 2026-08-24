import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ItemService } from '../../Services/item-service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { CategoryService } from '../../Services/category-service';
import { ItemDto } from '../../Dtos/item-dto';
import { CategoryDto } from '../../Dtos/category-dto';
import { FormInput } from "../form-input/form-input";

@Component({
  selector: 'app-create-category',
  imports: [ReactiveFormsModule, FormsModule, FormInput],
  templateUrl: './create-category.html',
  styleUrl: './create-category.css',
  changeDetection:ChangeDetectionStrategy.OnPush

})
export class CreateCategory {
  
  private formBuilder=inject(FormBuilder)
  constructor(private itemService:ItemService,private location:Location,private router:Router,private categoryService:CategoryService){}

  createCategoryForm=this.formBuilder.nonNullable.group({
    id:0,
    name: ["",[Validators.required,Validators.minLength(3)]],
    description:["",[Validators.required,Validators.minLength(3)]]
  })
  

  createCategory(){
    const categoryDto=this.createCategoryForm.getRawValue()
    this.categoryService.CreateCategory(categoryDto).subscribe({
      next:(res)=>{
        this.location.back()
      }
    })
  }

}
