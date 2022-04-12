import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../environments/environment";
import {User} from "./domain/user";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) {
    }

    getToken() {
        return localStorage.getItem("token");
    }

    registerUser(formValue: any): Observable<any> {
        return this.http.post<Observable<any>>(`${environment.server}/auth/register`, formValue);
    }

    loginUser(formValue: any): Observable<any> {
        return this.http.post<Observable<any>>(`${environment.server}/auth/login`, formValue);
    }

    //TODO: User Domain
    getCurrentUser(): Observable<any> {
        return this.http.get(`${environment.server}/auth/user`);
    }

    logoutUser(): Observable<any> {
        localStorage.clear();
        return this.http.post(`${environment.server}/auth/logout`, {});
    }
}
