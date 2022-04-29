import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../environments/environment";
import {EmployeesInLocalesAnalytics} from "./domain/employees-in-locales-analytics";

@Injectable({
    providedIn: 'root'
})
export class AnalyticsService {

    constructor(private http: HttpClient) {
    }

    getEmployeeNumbersByLocale(): Observable<EmployeesInLocalesAnalytics[]> {
        return this.http.get<EmployeesInLocalesAnalytics[]>(`${environment.server}/analytics/employees-in-locales`)
    }
}
