import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { SigningResponse } from '../Models/signing-response';
import { RegisterRequest } from '../Models/register-request';
import { LoginDto } from '../Dtos/login-dto';
import { User } from '../Models/user';
import { RefreshToken } from '../Models/refresh-token';
import { UserDto } from '../Dtos/user-dto';
import { SKIP_AUTH } from '../SKIP_AUTH';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private httpClient:HttpClient){}
  jwtToken=signal<string|null>(null)
  refreshToken=signal<RefreshToken|null>(null)
  userEmail=signal<string>('')
  SignUp(registerDto:RegisterRequest):Observable<SigningResponse>{
    return this.httpClient.post<SigningResponse>(`https://localhost:7273/api/auth/register`,registerDto)
  }

  SignIn(signInDto:LoginDto):Observable<SigningResponse>{
    // const newHttpContext=new HttpContext().set(SKIP_AUTH,false)
    return this.httpClient.post<SigningResponse>(`https://localhost:7273/api/auth/login`,signInDto).pipe(
      tap(res=>{
        this.jwtToken.set(res.jwtToken)
        this.refreshToken.set(res.refreshToken)
        this.userEmail.set(res.user.email)
      })
    )
  }

  GetCurrentUser():Observable<User>{
    const newHttpContext=new HttpContext().set(SKIP_AUTH,false)
    return this.httpClient.get<User>(`https://localhost:7273/api/auth/currentUser`,{context:newHttpContext})
  }

  SignOut():Observable<void>{
    return this.httpClient.put<void>(`https://localhost:7273/api/auth/logout`,{}).pipe(
      tap(res=>{
        this.jwtToken.set(null)
        this.refreshToken.set(null)
      })
    )
  }
  
  RefreshToken(userEmail:string):Observable<SigningResponse>{
    return this.httpClient.put<SigningResponse>(`https://localhost:7273/api/auth/refresh-token?userEmail=${userEmail}`,{}).pipe(
      tap(res=>{
        this.jwtToken.set(res.jwtToken)
        this.refreshToken.set(res.refreshToken)
        this.userEmail.set(res.user.email)
      })
    )
  }

   
}
