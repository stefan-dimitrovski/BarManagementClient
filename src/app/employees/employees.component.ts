import {Component, OnInit} from '@angular/core';
import {EmployeeService} from "../employee.service";

@Component({
    selector: 'app-employees',
    templateUrl: './employees.component.html',
    styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

    constructor(private employeeService: EmployeeService) {
    }

    ngOnInit(): void {
        this.employeeService.getEmployees().subscribe();
    }

}
