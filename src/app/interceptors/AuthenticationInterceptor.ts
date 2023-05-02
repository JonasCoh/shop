import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
    // They will need to use their own userService for this (need save the token there after login)
    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with our token if available
        let token:string|null;
        token = sessionStorage.getItem("token");
        if (token) {            
            request = request.clone({
                setHeaders: {
                    Authorization: token
                }
            });
        }
        return next.handle(request);
    }
}
