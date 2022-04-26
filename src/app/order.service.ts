import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Order} from "./domain/order";
import {DrinkInOrder} from "./domain/drink-in-order";
import {DrinkInOrderResponse} from "./domain/drink-in-order-response";

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    constructor(private http: HttpClient) {
    }

    openOrder(waiterId: number, tableId: number): Observable<Order> {
        return this.http.post<Order>(`/api/tables/${tableId}/orders/open-order`, {waiterId, tableId})
    }

    createDrinkInOrder(orderId: number, drinkId: number, quantity: number, tableId: number): Observable<DrinkInOrderResponse> {
        return this.http.post<DrinkInOrderResponse>(`/api/tables/${tableId}/orders/save-drinkInOrder`, {
            orderId,
            drinkId,
            quantity
        })
    }

    findByOrderIdAndDrinkId(orderId: number, drinkId: number, tableId: number): Observable<DrinkInOrderResponse> {
        return this.http.get<DrinkInOrderResponse>(`/api/tables/${tableId}/orders/orderId`)
    }

    addDrinkToOrder(tableId: number, orderId: number, drinkId: number): Observable<DrinkInOrder> {
        return this.http.post<DrinkInOrder>(`/api/tables/${tableId}/orders/add-drink`, {orderId, drinkId})
    }


}
