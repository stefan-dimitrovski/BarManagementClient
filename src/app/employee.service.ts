import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../environments/environment";
import {Employee} from "./domain/employee";

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {
    constructor(private http: HttpClient) {
    }

    getEmployees(): Observable<Employee[]> {
        return this.http
            .get<Employee[]>(`${environment.server}/employees`);
    }

    addEmployeeToLocale(employeeForm: any): Observable<Employee> {
        return this.http.post<Employee>(`${environment.server}/employees/add-to-locale`, employeeForm);
    }

}

