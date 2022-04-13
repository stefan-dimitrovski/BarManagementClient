import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {OrderService} from "../order.service";
import {filter, map, switchMap} from 'rxjs';


@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

    constructor(
        private route: ActivatedRoute,
        private service: OrderService,
    ) {
    }

    ngOnInit(): void {
        this.route.paramMap.pipe(filter((params) => params.has('id')),
            map((params) => +params.get('id')!),
            switchMap((id) => this.service.getTableById(id)
                .pipe(
                    map((hero) => ({id: id})))
            )
        )
    }

}
