import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Table} from '../domain/table';
import {TableService} from '../table.service';
import {ConfirmationService} from "primeng/api";
import {Router} from "@angular/router";

@Component({
    selector: 'app-tables',
    templateUrl: './tables.component.html',
    styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {

    tables: Table[] | undefined;
    tables$: Observable<Table[]> = this.tableService.getTables();
    waiterId = +localStorage.getItem("ID")!;
    localeId = +localStorage.getItem("LOCALE")!;

    constructor(
        private tableService: TableService,
        private confirmationService: ConfirmationService,
        private router: Router,
    ) {
    }

    ngOnInit(): void {
        this.tables$.subscribe({
            next: (data) => {
                this.tables = data
            },
            error: err => {
                console.log('ERROR: ', err.error.message);
            }
        });
    }

    confirm(id: number) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to perform this action?',
            accept: () => {
                this.router.navigate([`/tables/${id}/orders`]);
            },
            reject: () => {
            }
        });
    }

}
