import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {OrderService} from "../order.service";
import {filter, map, switchMap} from 'rxjs';
import {DrinkService} from "../drink.service";
import {Table} from "../domain/table";
import {Drink} from "../domain/drink";
import {TableService} from "../table.service";
import {Order} from "../domain/order";


@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
    table: Table | undefined;
    drinks: Drink[] = [];
    order: Order | undefined;
    drinksInOrder = [];
    value = 0;

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
                    console.log(this.drinks)

                }
            }
        )
        this.route.paramMap.pipe(filter((params) => params.has('tableId')),
            map((params) => +params.get('tableId')!),
            switchMap((tableId) =>
                this.orderService.openOrder(+localStorage.getItem('ID')!, tableId)
            )).subscribe({
            next: (order) => {
                this.order = order
                console.log(this.order)
            }

        })
    }

}
