import { HttpInterceptorFn } from '@angular/common/http';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
    const newHeaders = req.clone({
        headers: req.headers.set("Content-Type", "application/json;charset=utf-8")
    })
    return next(req);
};
