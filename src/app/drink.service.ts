import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Drink} from "./domain/drink";
import {environment} from "../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class DrinkService {

    constructor(private http: HttpClient) {
    }

    getAllDrinks(): Observable<Drink[]> {
        return this.http.get<Drink[]>(`${environment.server}/drinks`)
    }

}
