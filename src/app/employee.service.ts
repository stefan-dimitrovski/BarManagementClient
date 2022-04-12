import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {environment} from "../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {
    constructor(private http: HttpClient) {
    }

    getEmployees(): Observable<any> {
        return this.http
            .get(`${environment.server}/employees`)
            .pipe(
                tap(data => console.log(data))
            );
    }
}

