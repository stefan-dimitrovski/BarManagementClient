import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../environments/environment";
import {LoginResponse} from "./domain/login-response";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    isLogin = false;
    roleAs: string = '';
    token: string = '';
    email: string = '';

    constructor(private http: HttpClient) {
    }

    getToken() {
        return this.token;
    }

    registerUser(formValue: any): Observable<any> {
        return this.http.post<Observable<any>>(`${environment.server}/auth/register`, formValue);
    }

    loginUser(formValue: any) {
        this.http.post<LoginResponse>(`${environment.server}/auth/login`, formValue).subscribe({
            next: value => {
                this.isLogin = true;
                this.roleAs = value.role;
                this.email = value.email;
                this.token = value.token;
                localStorage.setItem('STATE', 'true');
                localStorage.setItem('TOKEN', this.token);
                localStorage.setItem('EMAIL', this.email);
                localStorage.setItem('ROLE', this.roleAs);
            }, error: err => {
                console.error(err);
            }
        });
    }

    logoutUser(): boolean {
        this.isLogin = false;
        this.roleAs = '';
        this.token = '';
        localStorage.setItem('STATE', 'false');
        localStorage.setItem('TOKEN', '');
        localStorage.setItem('ROLE', '');
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
}
