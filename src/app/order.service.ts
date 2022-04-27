import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Order} from "./domain/order";
import {DrinkInOrder} from "./domain/drink-in-order";
import {DrinkInOrderResponse} from "./domain/drink-in-order-response";
import {OrderResponse} from "./domain/order-response";

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    constructor(private http: HttpClient) {
    }

    openOrder(waiterId: number, tableId: number): Observable<OrderResponse> {
        return this.http.post<OrderResponse>(`/api/tables/${tableId}/orders/create-order`, {waiterId, tableId})
    }

    createDrinkInOrder(orderId: number, drinkId: number, quantity: number, tableId: number): Observable<DrinkInOrderResponse> {
        return this.http.post<DrinkInOrderResponse>(`/api/tables/${tableId}/orders/save-drinkInOrder`, {
            orderId,
            drinkId,
            quantity
        })
    }

    getAllDrinksInOrder(orderId: number): Observable<DrinkInOrder[]> {
        return this.http.get<DrinkInOrder[]>(`/api/tables/{tableId}/orders/order?id=${orderId}`)
    }

    getOrder (id: number) : Observable<Order>{
        return this.http.get<Order>(`/api/tables/{tableId}/orders/get-order?id=${id}`)
    }

    findByOrderIdAndDrinkId(orderId: number, drinkId: number, tableId: number): Observable<DrinkInOrderResponse> {
        return this.http.get<DrinkInOrderResponse>(`/api/tables/${tableId}/orders/orderId`)
    }

    addDrinkToOrder(tableId: number, orderId: number, drinkId: number): Observable<DrinkInOrder> {
        return this.http.post<DrinkInOrder>(`/api/tables/${tableId}/orders/add-drink`, {orderId, drinkId})
    }


}
