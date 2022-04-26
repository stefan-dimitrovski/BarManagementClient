import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    constructor(private http: HttpClient) {
    }

    getStorage(id: number): Observable<any> {
        return this.http
            .get<any>(`${environment.server}/storage/${id}`);
    }
}
