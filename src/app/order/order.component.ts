import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {OrderService} from "../order.service";
import {filter, map, mergeMap, switchMap} from 'rxjs';
import {DrinkService} from "../drink.service";
import {Table} from "../domain/table";
import {Drink} from "../domain/drink";
import {TableService} from "../table.service";
import {Order} from "../domain/order";
import {FormControl} from "@angular/forms";

import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {DrinkInOrder} from "../domain/drink-in-order";
import {ConfirmationService, MessageService} from "primeng/api";


@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
    table: Table | undefined;
    drinks: Drink[] = [];
    order: Order | undefined;
    drinksInOrder: DrinkInOrder[] = [];
    drinkInOrder: DrinkInOrder | undefined;
    totalPrice: number | undefined;
    controls = new Map();
    message: string = "";
    waiterId = +localStorage.getItem("ID")!;
    localeId = +localStorage.getItem("LOCALE")!;


    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private orderService: OrderService,
        private drinkService: DrinkService,
        private tableService: TableService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
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
            mergeMap((orderResponse) => this.orderService.getTotalPriceByOrder(orderResponse.order.id).pipe(
                map((totalPrice) => ({order: orderResponse.order, totalPrice: totalPrice}))
            )),
            mergeMap(({order, totalPrice}) => this.orderService.getAllDrinksInOrder(order.id).pipe(
                    map((drinks) => ({order: order, totalPrice: totalPrice, drinks: drinks}))
                )
            )
        )
            .subscribe({
                next: (response) => {
                    for (let i = 0; i < response.drinks.length; i++) {
                        this.controls.set(response.drinks[i].id, new FormControl(response.drinks[i].quantity))
                    }
                    this.order = response.order;
                    this.drinksInOrder = response.drinks.sort((a, b) => a.id - b.id);
                    this.totalPrice = response.totalPrice
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
            this.orderService.createDrinkInOrder(this.order!.id, drink.id, 0, this.table!.id)
                .subscribe({
                    next: ((response) => {
                        this.drinkInOrder = response.drinkInOrder;
                        let qty = response.drinkInOrder.quantity;
                        this.controls.set(response.drinkInOrder.id, new FormControl(qty));
                        let isPresent = this.drinksInOrder.filter((el) => {
                            return el.id == response.drinkInOrder.id;
                        }).length > 0;
                        if (!isPresent) {
                            const drinkItem = [{
                                id: response.drinkInOrder.id,
                                order: this.order,
                                drink: event.previousContainer.data[event.previousIndex],
                                quantity: qty
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

    updateDrinkQuantityInOrder(drinkInOrderId: number, orderId: number) {
        let qty = this.controls.get(drinkInOrderId).value
        this.orderService.updateDrinkQuantityInOrder(drinkInOrderId, qty).pipe(
        ).subscribe({
            next: (response) => {
                this.drinkInOrder = response
            },
            error: (err) => {
                this.message = err.error.message
                console.log(this.message)
            }
        })

        this.orderService.getTotalPriceByOrder(orderId).subscribe(
            (it) => this.totalPrice = it
        )

        this.ngOnInit();
    }

    private closeOrder() {
        this.orderService.closeOrder(this.order!.id, this.table!.id).subscribe(
            () => {
                this.router.navigate([`/locale/${this.localeId}/tables`]);
            }
        )
    }

    confirm() {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to perform this action?',
            accept: () => {
                this.closeOrder();
            },
            reject: () => {
            }
        });
    }


}
