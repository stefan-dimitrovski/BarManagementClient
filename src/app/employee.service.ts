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

    getEmployee(id: number): Observable<Employee> {
        return this.http.get<Employee>(`${environment.server}/employees/${id}`);
    }

    addEmployeeToLocale(employeeForm: any): Observable<Employee> {
        return this.http.put<Employee>(`${environment.server}/employees/add-to-locale`, employeeForm);
    }
}

