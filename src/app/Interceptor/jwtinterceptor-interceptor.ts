import { HttpInterceptorFn } from '@angular/common/http';

export const jWTInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const jwtToken = sessionStorage.getItem("key")
  if(jwtToken){
    const clone = req.clone({
       setHeaders:{
        Authorization: `Bearer ${jwtToken}`
       }
    })
    return next(clone)
  }
  return next(req);
};
