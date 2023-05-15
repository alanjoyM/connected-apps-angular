import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SpinnerService } from 'src/app/common-ui-comp/spinner.service';
import { finalize } from 'rxjs/operators';
import {catchError, map} from 'rxjs/operators'

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {

  constructor(private spinnerService : SpinnerService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(request.url);
    this.spinnerService.startSpinner();
    return next.handle(request).pipe(
      finalize(() => {
        this.spinnerService.endSpinner();

      })
    )
  }
  handler(next:any,request:any){
    return next.handle(request)
         .pipe( (event:any)=>{
                   if (event instanceof HttpResponse){
                    this.spinnerService.endSpinner();
                    console.log("cauuught in succc");

              }
            },
            (error:HttpErrorResponse)=>{
              this.spinnerService.endSpinner();
              console.log("cauuught in errrr");

              throw error;
            }
          );



  }
}
