import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {OrderService} from "../order.service";
import {filter, map, switchMap} from 'rxjs';
import {DrinkService} from "../drink.service";
import {Table} from "../domain/table";
import {Drink} from "../domain/drink";
import {TableService} from "../table.service";
import {Order} from "../domain/order";

import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {DrinkInOrder} from "../domain/drink-in-order";


@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
    table!: Table;
    drinks: Drink[] = [];
    order: Order | undefined;
    quantity = 0;
    drinksInOrder: DrinkInOrder[] = [];
    drinkInOrder: DrinkInOrder | undefined;

    message: string = "";
    waiterId = +localStorage.getItem("ID")!


    constructor(
        private route: ActivatedRoute,
        private orderService: OrderService,
        private drinkService: DrinkService,
        private tableService: TableService
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
                this.orderService.openOrder(this.waiterId, tableId)
            )).subscribe({
            next: (order) => {
                this.order = order;
                console.log("ORDER:");
                console.log(order);
            },
            error: err => {
                this.order = err.error.order;
            }
        })

    }

    // openOrder() {
    //     this.route.paramMap.pipe(filter((params) => params.has('tableId')),
    //         map((params) => +params.get('tableId')!),
    //         switchMap((tableId) =>
    //             this.orderService.openOrder(+localStorage.getItem('ID')!, tableId)
    //         )).subscribe({
    //         next: (order) => {
    //             this.order = order
    //         }
    //     })
    // }


    drop(event: CdkDragDrop<any>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            let drink: Drink = event.previousContainer.data[event.previousIndex];
            // this.addDrinkToOrder(this.order!.id, drink.id, 0, this.table.id)
            this.orderService.createDrinkInOrder(this.order!.id, drink.id, 0, this.table.id).subscribe({
                next: ((d) => {
                    this.drinkInOrder = d.drinkInOrder;
                    this.quantity = d.drinkInOrder.quantity;
                    let isPresent = this.drinksInOrder.filter((el) => {
                        return el.id == d.drinkInOrder.id;
                    }).length > 0;
                    console.log("DRINKS IN ORDER:");
                    console.log(d.drinkInOrder.id)
                    if (!isPresent) {
                        const drinkItem = [{
                            id: d.drinkInOrder.id,
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
                }
            })
        }
    }

    updateDrinkQuantityInOrder(drinkId: number, quantity: number) {

    }


}
