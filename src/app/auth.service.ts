import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
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

    registerUser(formValue: any): Observable<any> {
        return this.http.post<Observable<any>>(`/api/auth/register`, formValue);
    }

    loginUser(formValue: any): Observable<any> {
        return this.http.post<LoginResponse>(`/api/auth/login`, formValue);
    }

    isLoggedIn() {
        const loggedIn = localStorage.getItem('STATE');
        this.isLogin = loggedIn == 'true';
        return this.isLogin;
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

    saveUserToLocalStorage(data: any) {
        this.isLogin = true;
        this.roleAs = data.role;
        localStorage.setItem('ID', data.id.toString());
        localStorage.setItem('STATE', 'true');
        localStorage.setItem('TOKEN', data.token);
        localStorage.setItem('EMAIL', data.email);
        localStorage.setItem('ROLE', this.roleAs);
        data.locale ? localStorage.setItem('LOCALE', data.locale.id.toString()) : localStorage.setItem('LOCALE', '');
        Emitters.authEmitter.emit(true);
    }

    getRole() {
        this.roleAs = localStorage.getItem('ROLE')!!;
        return this.roleAs;
    }

    getLocaleId() {
        return localStorage.getItem('LOCALE');
    }

    getToken() {
        return localStorage.getItem('TOKEN');
    }

    getEmail() {
        return localStorage.getItem('EMAIL');
    }
}
