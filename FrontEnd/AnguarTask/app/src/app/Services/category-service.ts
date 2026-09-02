import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoryDto } from '../Dtos/category-dto';
import { Observable } from 'rxjs';
import { SKIP_AUTH } from '../SKIP_AUTH';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {

  constructor(private httpClient:HttpClient){}

  CreateCategory(categoryDto:CategoryDto):Observable<CategoryDto>{
    const newHttpContext=new HttpContext().set(SKIP_AUTH,false)
    return this.httpClient.post<CategoryDto>(`https://localhost:7273/api/categories`,categoryDto,{context:newHttpContext})
  }
  GetAllCategories():Observable<CategoryDto[]>{
  const newHttpContext=new HttpContext().set(SKIP_AUTH,false)
  return this.httpClient.get<CategoryDto[]>(`https://localhost:7273/api/categories`,{context:newHttpContext})
  }
  GetCategory(categoryId:number):Observable<CategoryDto>{
    const newHttpContext=new HttpContext().set(SKIP_AUTH,false)
    return this.httpClient.get<CategoryDto>(`https://localhost:7273/api/categories/${categoryId}`,{context:newHttpContext})
  }
  DeleteCategory(categoryId:number):Observable<void>{
    const newHttpContext=new HttpContext().set(SKIP_AUTH,false)
    return this.httpClient.delete<void>(`https://localhost:7273/api/categories/${categoryId}`,{context:newHttpContext})
  }

  UpdateCategory(categoryId:number,categoryDto:CategoryDto):Observable<CategoryDto>{
    const newHttpContext=new HttpContext().set(SKIP_AUTH,false)
    return this.httpClient.put<CategoryDto>(`hhttps://localhost:7273/api/categories/${categoryId}?newName=${categoryDto.name}&newDescription=${categoryDto.description}`,categoryDto,{context:newHttpContext})
  }
  
}
