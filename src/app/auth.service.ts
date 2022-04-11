import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) {
    }

    registerUser(formValue: any): Observable<any> {
        return this.http.post<Observable<any>>(`${environment.server}/register`, formValue);
    }

    loginUser(formValue: any): Observable<any> {
        return this.http.post<Observable<any>>(`${environment.server}/login`, formValue, {withCredentials: true});
    }
}
