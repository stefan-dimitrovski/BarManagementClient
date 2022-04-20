import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Order} from "./domain/order";
import {DrinkInOrder} from "./domain/drink-in-order";

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    constructor(private http: HttpClient) {
    }

    openOrder(waiterId: number, tableId: number): Observable<Order> {
        return this.http.post<Order>(`/api/tables/${tableId}/orders/`, {waiterId, tableId})
    }

    addDrinkToOrder(tableId: number, orderId: number, drinkId: number): Observable<DrinkInOrder> {
        return this.http.post<DrinkInOrder>(`/api/tables/${tableId}/orders/add-drink`, {orderId, drinkId})
    }


}
