import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { ItemDto } from '../Dtos/item-dto';

@Injectable({
  providedIn: 'root',
})
export class LifeUpdatesService {
  private hubConnection:signalR.HubConnection={} as signalR.HubConnection

  startConnection(){
    this.hubConnection=new signalR.HubConnectionBuilder()
    .withUrl('https://localhost:7273/hub')
    // .withAutomaticReconnect()
    .build();

    this.hubConnection.start().then(()=>console.log("connection is started"))
  }
  constructor(private httpClient:HttpClient){}


  receiveUpdatedingMessage(callback:(itemDto:ItemDto)=>void){
    this.hubConnection.on("ReceiveMessage",(itemDto)=>{
        callback(itemDto);
    });
  }
  
}
