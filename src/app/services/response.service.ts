import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

import { ToastrService } from 'ngx-toastr';
import { Observable,throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ResponseService {

  constructor(private toast: ToastrService,private ngxspinner:NgxSpinnerService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      // retry(2),
      catchError((error: HttpErrorResponse) => {
        switch (error.status) {
          case 412:
          case 400:
          case 500:
          case 422:
          case 429:                  
              if(error.error?.errors){
                console.log(error.error.message);
                
                this.toast.error(error.error.message);

                this.ngxspinner.hide();
              }else{
                console.log(error.error.message);

                this.ngxspinner.hide();
                this.toast.error(error.error.message);

              }
              break;
          default:
              break;
        }
      return throwError(error);

      })

    );
  }
}
