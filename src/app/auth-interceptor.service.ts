import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

    constructor(private authService: AuthService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.authService.getToken()) {
            const TOKEN = this.authService.getToken()!;
            const modified = req.clone({
                setHeaders: {"Authorization": `Bearer ${TOKEN}`}
            });
            return next.handle(modified);
        } else {
            return next.handle(req);
        }
    }
}
