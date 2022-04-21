import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Table} from '../domain/table';
import {TableService} from '../table.service';

@Component({
    selector: 'app-tables',
    templateUrl: './tables.component.html',
    styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {

    tables: Table[] | undefined;
    tables$: Observable<Table[]> = this.tableService.getTables();
    currentWaiterId: number | undefined;

    constructor(
        private tableService: TableService,
    ) {
    }

    ngOnInit(): void {
        this.currentWaiterId = +localStorage.getItem("ID")!
        this.tables$.subscribe({
            next: (data) => {
                this.tables = data
                console.log(this.tables)
            },
            error: err => {
                console.log('ERROR', err);
            }
        });
    }

}
