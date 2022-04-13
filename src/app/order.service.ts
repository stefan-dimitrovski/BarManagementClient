import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Table} from "./domain/table";
import {environment} from "../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    constructor(private http: HttpClient) {
    }

    getTableById(id: number): Observable<Table> {
        return this.http.get<Table>(`${environment.server}/tables/${id}`)
    }


}
