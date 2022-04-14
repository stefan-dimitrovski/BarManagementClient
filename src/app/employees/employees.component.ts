import {Component, OnInit} from '@angular/core';
import {EmployeeService} from "../employee.service";
import {Employee} from "../domain/employee";

@Component({
    selector: 'app-employees',
    templateUrl: './employees.component.html',
    styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
    employees: Employee[] = [];
    isLoading = true;

    constructor(private employeeService: EmployeeService) {
    }

    ngOnInit(): void {
        this.employeeService.getEmployees().subscribe({
            next: value => {
                console.log(value);
                this.isLoading = false;
                this.employees = value;
            }, error: err => {
                console.log(err);
                this.isLoading = false;
            }
        });
    }

}
