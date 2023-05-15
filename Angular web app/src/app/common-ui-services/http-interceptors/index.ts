import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ErrorHandleInterceptor } from "./error-handle.interceptor";
import { SpinnerInterceptor } from "./spinner.interceptor";


export const httpInterceptProviders =[

  {provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor , multi :true},
  {provide: HTTP_INTERCEPTORS, useClass: ErrorHandleInterceptor , multi :true}
];
