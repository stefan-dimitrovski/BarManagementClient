import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../environments/environment";
import {LoginResponse} from "./domain/login-response";
import {Emitters} from "./emitters/emitters";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    isLogin = false;
    roleAs: string = '';

    constructor(
        private http: HttpClient
    ) {
    }

    getToken() {
        return localStorage.getItem('TOKEN');
    }

    getEmail() {
        return localStorage.getItem('EMAIL');
    }

    registerUser(formValue: any): Observable<any> {
        return this.http.post<Observable<any>>(`${environment.server}/auth/register`, formValue);
    }

    loginUser(formValue: any) {
        this.http.post<LoginResponse>(`${environment.server}/auth/login`, formValue).subscribe({
            next: value => {
                this.isLogin = true;
                this.roleAs = value.role;
                localStorage.setItem('ID', value.id.toString());
                localStorage.setItem('STATE', 'true');
                localStorage.setItem('TOKEN', value.token);
                localStorage.setItem('EMAIL', value.email);
                localStorage.setItem('ROLE', this.roleAs);
                value.locale ? localStorage.setItem('LOCALE', value.locale.id.toString()) : localStorage.setItem('LOCALE', '');
                Emitters.authEmitter.emit(true);
            }, error: err => {
                console.error(err);
            }
        });
    }

    logoutUser(): boolean {
        this.isLogin = false;
        this.roleAs = '';
        localStorage.setItem('STATE', 'false');
        localStorage.setItem('ID', '');
        localStorage.setItem('TOKEN', '');
        localStorage.setItem('ROLE', '');
        localStorage.setItem('EMAIL', '');
        localStorage.setItem('LOCALE', '');
        Emitters.authEmitter.emit(false);
        return true;
    }

    isLoggedIn() {
        const loggedIn = localStorage.getItem('STATE');
        this.isLogin = loggedIn == 'true';
        return this.isLogin;
    }

    getRole() {
        this.roleAs = localStorage.getItem('ROLE')!!;
        return this.roleAs;
    }

    getLocaleId() {
        return localStorage.getItem('LOCALE');
    }
}
