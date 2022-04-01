import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Table } from './domain/table';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class LocaleService {
    constructor(private http: HttpClient) {}

    getLocales(map: L.Map): Observable<Table[]> {
        return this.http
            .get<Table[]>(`${environment.server}/locales`)
            .pipe(tap((data) => console.log(data)));
    }
}
