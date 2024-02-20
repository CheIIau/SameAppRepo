import { HttpInterceptorFn } from '@angular/common/http';

export const loggerInterceptor: HttpInterceptorFn = (req, next) => {
    console.log(`Request body is ${req.body}`)
    return next(req);
};
