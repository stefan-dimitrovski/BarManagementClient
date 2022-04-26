import {Component, Input, OnInit} from '@angular/core';
import {EmployeeService} from "../employee.service";
import {Employee} from "../domain/employee";
import {Locale} from "../domain/locale";
import {forkJoin, Subject, switchMap} from "rxjs";
import {LocaleService} from "../locale.service";

@Component({
    selector: 'app-employees',
    templateUrl: './employees.component.html',
    styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
    @Input() employees: Employee[] = [];
    locales: Locale[] = [];
    isLoading = true;

    fetchData$ = new Subject<void>();

    constructor(
        private employeeService: EmployeeService,
        private localeService: LocaleService) {
    }

    ngOnInit(): void {
        this.fetchData$.pipe(
            switchMap(() => forkJoin({
                locales: this.localeService.getLocales(),
                employees: this.employeeService.getEmployees(),
            }))
        ).subscribe({
            next: value => {
                this.locales = value.locales;
                this.employees = value.employees;
            },
            error: err => {
                console.log(err);
            }
        });

        this.fetchData$.next();
    }

    addEmployeeToLocale(employeeId: number, localeId: number) {
        const request = {
            employeeId: employeeId,
            localeId: localeId
        }
        this.employeeService.addEmployeeToLocale(request).subscribe({
            next: () => this.fetchData$.next(),
            error: err => console.log(err)
        });
    }

    onSearch(value: any) {
        this.employees = value;
    }

}
