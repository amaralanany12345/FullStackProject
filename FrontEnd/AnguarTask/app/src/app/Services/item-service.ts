import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemDto } from '../Dtos/item-dto';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor(private httpClient:HttpClient){}

  CreateItem(itemDto:ItemDto):Observable<ItemDto>{
    return this.httpClient.post<ItemDto>(`https://localhost:7273/api/items`,itemDto)
  }
  GetAllItems():Observable<ItemDto[]>{
    return this.httpClient.get<ItemDto[]>(`https://localhost:7273/api/items`)
  }
  GetItemById(itemId:number):Observable<ItemDto>{
    return this.httpClient.get<ItemDto>(`https://localhost:7273/api/items/${itemId}`)
  }
  
  GetItemsByCategoryId(categoryId:number):Observable<ItemDto[]>{
    return this.httpClient.get<ItemDto[]>(`https://localhost:7273/api/items/category/${categoryId}`)
  }

  DeleteItemById(itemId:number):Observable<void>{
    return this.httpClient.delete<void>(`https://localhost:7273/api/items/${itemId}`)
  }

  UpdateItemById(itemDto:ItemDto):Observable<ItemDto>{
    return this.httpClient.put<ItemDto>(`https://localhost:7273/api/items`,itemDto)
  }
  SearchAboutItem(itemName:string):Observable<ItemDto[]>{
    return this.httpClient.get<ItemDto[]>(`https://localhost:7273/api/items/itemName/${itemName}`)
  }
  
}
