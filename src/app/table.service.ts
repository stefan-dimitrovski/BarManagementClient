import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Table} from './domain/table';

@Injectable({
    providedIn: 'root'
})
export class TableService {

    constructor(private http: HttpClient) {
    }

    getTables(): Observable<Table[]> {
        return this.http.get<Table[]>(`/api/tables`)
    }

    getTableById(id: number): Observable<Table> {
        return this.http.get<Table>(`/api/tables/${id}`)
    }
}
