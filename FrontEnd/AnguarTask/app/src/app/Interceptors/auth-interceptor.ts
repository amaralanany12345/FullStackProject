import {HttpErrorResponse,HttpInterceptorFn} from '@angular/common/http';
import { inject } from '@angular/core';
import {catchError,switchMap,throwError} from 'rxjs';
import { UserService } from '../Services/user-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
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
    catchError((error: HttpErrorResponse) => {
      if (error.status !== 401) {
        return throwError(() => error)
      }
      
      return userService
        .RefreshToken(userService.userEmail())
        .pipe(
          switchMap(res => {
            const refreshReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${res.jwtToken}`
              }
            })
            return next(refreshReq)
          }),
          catchError(refreshError => {
            userService.jwtToken.set(null)
            userService.refreshToken.set(null)
            userService.userEmail.set('')
            return throwError(() => refreshError)
          })
        )
    })
  )
}