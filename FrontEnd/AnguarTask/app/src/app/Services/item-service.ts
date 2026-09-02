import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemDto } from '../Dtos/item-dto';
import * as signalR from '@microsoft/signalr';
import { SKIP_AUTH } from '../SKIP_AUTH';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor(private httpClient:HttpClient){}
  private hubConnection:signalR.HubConnection={} as signalR.HubConnection

  startConnection(){
    this.hubConnection=new signalR.HubConnectionBuilder()
    .withUrl('https://localhost:7273/hub')
    .build()
    this.hubConnection.start()
  }

  receiveUpdatedingMessage(callback:()=>void){
    this.hubConnection.on("itemUpdated",()=>{
        callback()
    })
  }

  CreateItem(itemDto:ItemDto):Observable<ItemDto>{
    const newHttpContext=new HttpContext().set(SKIP_AUTH,false)
    return this.httpClient.post<ItemDto>(`https://localhost:7273/api/items`,itemDto,{context:newHttpContext})
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

  GetItemsByPagination(pageSize:number,pageNumber:number):Observable<ItemDto[]>{
    return this.httpClient.get<ItemDto[]>(`https://localhost:7273/api/items/pagination?pageSize=${pageSize}&pageNumber=${pageNumber}`)
  }

  DeleteItemById(itemId:number):Observable<void>{
    const newHttpContext=new HttpContext().set(SKIP_AUTH,false)
    return this.httpClient.delete<void>(`https://localhost:7273/api/items/${itemId}`,{context:newHttpContext})
  }

  UpdateItemById(itemDto:ItemDto):Observable<ItemDto>{
    const newHttpContext=new HttpContext().set(SKIP_AUTH,false)
    return this.httpClient.put<ItemDto>(`https://localhost:7273/api/items`,itemDto,{context:newHttpContext})
  }
  SearchAboutItem(itemName:string):Observable<ItemDto[]>{
    return this.httpClient.get<ItemDto[]>(`https://localhost:7273/api/items/itemName/${itemName}`)
  }
  
}
