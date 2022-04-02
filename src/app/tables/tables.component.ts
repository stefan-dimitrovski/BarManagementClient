import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Table } from '../domain/table';
import { TableService } from '../table.service';


@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {

  tables$: Observable<Table[]> = this.tableService.getTables();


  constructor(
    private tableService: TableService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }



}
