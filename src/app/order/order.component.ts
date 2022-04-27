import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {OrderService} from "../order.service";
import {filter, map, mergeMap, switchMap} from 'rxjs';
import {DrinkService} from "../drink.service";
import {Table} from "../domain/table";
import {Drink} from "../domain/drink";
import {TableService} from "../table.service";
import {Order} from "../domain/order";
import {FormBuilder} from "@angular/forms";


import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {DrinkInOrder} from "../domain/drink-in-order";
import {MessageService} from "primeng/api";


@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
    table: Table | undefined;
    drinks: Drink[] = [];
    order: Order | undefined;
    quantity = 0;
    drinksInOrder: DrinkInOrder[] = [];
    drinkInOrder: DrinkInOrder | undefined;

    quantityForm = this.formBuilder.group({
        quantity: 0,

    });
    message: string = "";
    waiterId = +localStorage.getItem("ID")!


    constructor(
        private route: ActivatedRoute,
        private orderService: OrderService,
        private drinkService: DrinkService,
        private tableService: TableService,
        private messageService: MessageService,
        private formBuilder: FormBuilder
    ) {
    }

    ngOnInit(): void {
        this.route.paramMap.pipe(filter((params) => params.has('tableId')),
            map((params) => +params.get('tableId')!),
            switchMap((tableId) => this.tableService.getTableById(tableId)
            )
        ).subscribe({
                next: (table) => {
                    this.table = table
                }
            }
        )
        this.drinkService.getAllDrinks().subscribe(
            {
                next: (drinks) => {
                    this.drinks = drinks;
                }
            }
        )
        this.route.paramMap.pipe(filter((params) => params.has('tableId')),
            map((params) => +params.get('tableId')!),
            switchMap((tableId) =>
                this.orderService.openOrder(this.waiterId, tableId)),
            mergeMap((orderResponse) => this.orderService.getAllDrinksInOrder(orderResponse.order.id).pipe(
                    map((drinks) => ({order: orderResponse.order, drinks: drinks}))
                )
            )
        )
            .subscribe({
                next: (response) => {
                    this.order = response.order;
                    this.drinksInOrder = response.drinks;

                },
                error: (err) => {
                    this.message = err.error.message
                    console.error(this.message)
                }
            })
    }


    drop(event: CdkDragDrop<any>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            let drink: Drink = event.previousContainer.data[event.previousIndex];
            this.orderService.createDrinkInOrder(this.order!.id, drink.id, 0, this.table!.id).subscribe({
                next: ((response) => {
                    this.drinkInOrder = response.drinkInOrder;
                    this.quantity = response.drinkInOrder.quantity;
                    let isPresent = this.drinksInOrder.filter((el) => {
                        return el.id == response.drinkInOrder.id;
                    }).length > 0;
                    console.log("DRINKS IN ORDER:");
                    console.log(response.drinkInOrder.id)
                    if (!isPresent) {
                        const drinkItem = [{
                            id: response.drinkInOrder.id,
                            order: this.order,
                            drink: event.previousContainer.data[event.previousIndex],
                            quantity: this.quantity,
                        }]
                        transferArrayItem(
                            drinkItem,
                            event.container.data,
                            event.previousIndex,
                            event.currentIndex);
                    }
                }),
                error: (err) => {
                    this.message = err.error.message;
                    this.drinkInOrder = err.error.drinkInOrder;
                    console.error(this.message);
                    this.showError();
                }
            })
        }
    }

    showError() {
        this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Drink is already in order. Please increase quantity instead!'
        });
    }


    updateDrinkQuantityInOrder(){

    }

    // updateDrinkQuantityInOrder(drinkId: number, quantity: number) {
    //
    // }


}
