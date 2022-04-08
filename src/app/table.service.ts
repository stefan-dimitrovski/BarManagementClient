import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {Table} from './domain/table';

@Injectable({
    providedIn: 'root'
})
export class TableService {

    constructor(private http: HttpClient) {
    }

    getTables(): Observable<Table[]> {
        return this.http.get<Table[]>(`${environment.server}/tables`)
    }

    getTableById(id: number): Observable<Table> {
        return this.http.get<Table>(`${environment.server}/tables/${id}`)
    }
}
