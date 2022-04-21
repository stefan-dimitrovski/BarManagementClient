import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {debounceTime, distinctUntilChanged, Subject, switchMap} from "rxjs";
import {EmployeeService} from "../employee.service";
import {Employee} from "../domain/employee";

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
    searchTerm$ = new Subject<string>();
    @Output() valueSearch = new EventEmitter<Employee[]>();

    constructor(private employeeService: EmployeeService) {
    }

    ngOnInit(): void {
        this.searchTerm$.pipe(
            debounceTime(350),
            distinctUntilChanged(),
            switchMap(term => this.employeeService.searchEmployees(term)),
        ).subscribe({
            next: value => {
                this.valueSearch.emit(value);
            }
        })
    }

    search(value: any) {
        this.searchTerm$.next(value);
    }

}
