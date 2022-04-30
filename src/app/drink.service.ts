import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Drink} from "./domain/drink";

@Injectable({
    providedIn: 'root'
})
export class DrinkService {

    constructor(private http: HttpClient) {
    }

    getAllDrinks(): Observable<Drink[]> {
        return this.http.get<Drink[]>(`api/drinks`)
    }

    searchDrinks(query: string): Observable<Drink[]> {
        if (!query.trim()) {
            return this.getAllDrinks();
        }
        return this.http.get<Drink[]>(`api/drinks/search?q=${query}`);
    }


}
