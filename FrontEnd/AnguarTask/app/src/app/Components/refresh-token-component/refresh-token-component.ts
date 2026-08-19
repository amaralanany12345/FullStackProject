import { Component } from '@angular/core';
import { UserService } from '../../Services/user-service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-refresh-token-component',
  imports: [],
  templateUrl: './refresh-token-component.html',
  styleUrl: './refresh-token-component.css',
})
export class RefreshTokenComponent {

  constructor(private userService:UserService,private location:Location,private router:Router){}

  RefreshTheToken(){
    this.userService.RefreshToken(this.userService.userEmail()).subscribe({
      next:(res)=>{
        this.location.back()
      },
      error:(err:Error)=>{
        if(err){
          this.router.navigateByUrl('')
        }
      }
    })
  }

}
