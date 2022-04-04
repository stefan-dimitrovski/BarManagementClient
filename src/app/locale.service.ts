import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Locale } from './domain/locale';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class LocaleService {
    constructor(private http: HttpClient) {}

    getLocales(map: L.Map): Observable<Locale[]> {
        return this.http
            .get<Locale[]>(`${environment.server}/locales`);
    }
}
