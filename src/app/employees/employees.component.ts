import {Component, OnInit} from '@angular/core';
import {EmployeeService} from "../employee.service";
import {Employee} from "../domain/employee";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Locale} from "../domain/locale";

@Component({
    selector: 'app-employees',
    templateUrl: './employees.component.html',
    styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
    employees: Employee[] = [];
    locales: Locale[] = [];
    isLoading = true;
    addToLocaleForm = new FormGroup({
        localeId: new FormControl('', Validators.required),
    });

    constructor(private employeeService: EmployeeService) {
    }

    ngOnInit(): void {
        this.employeeService.getEmployees().subscribe({
            next: value => {
                this.isLoading = false;
                this.employees = value;
            }, error: err => {
                console.error(err);
                this.isLoading = false;
            }
        });
    }

    addEmployeeToLocale(employeeId: number) {
        //TODO try improve this implementation
        const response = {
            employeeId: employeeId,
            localeId: +this.addToLocaleForm.value.localeId
        }
        this.employeeService.addEmployeeToLocale(response).subscribe({
            next: value => console.log(value)
        });
    }

}
