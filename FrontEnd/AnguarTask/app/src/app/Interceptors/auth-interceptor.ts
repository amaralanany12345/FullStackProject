import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { UserService } from '../Services/user-service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router=inject(Router)
  const userService = inject(UserService)
  const token = userService.jwtToken()
  if (!token) {
    return next(req)
  }

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  })

  return next(authReq).pipe(
    catchError((error) => {
      if (error.status === 401) {
        return userService.RefreshToken(userService.userEmail()).pipe(
          switchMap((res) => {
            const refreshTokenReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${res.jwtToken}`
              }
            })
            return next(refreshTokenReq);
          }),
        )
      }
      router.navigateByUrl('')
      return throwError(() => error)
    })
  )
}