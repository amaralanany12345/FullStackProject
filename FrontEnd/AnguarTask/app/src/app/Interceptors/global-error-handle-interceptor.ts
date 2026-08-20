import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { count } from 'console';
import { delay, retry, tap } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar'
export const globalErrorHandleInterceptor: HttpInterceptorFn = (req, next) => {
  const snackBar=inject(MatSnackBar)
  return next(req).pipe(
    tap({
      error:(err:HttpErrorResponse)=>{
        var message=err.error.message
        console.log(err.message)
        var status=err.status
        if(status!=0){
          snackBar.open(status + "--" +message,'Close',{
            horizontalPosition:'end',
            verticalPosition:'top',
            duration:5000
          })
        }
      }
    })
  )
};
