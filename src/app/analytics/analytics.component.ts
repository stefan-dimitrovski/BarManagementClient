import {Component, OnInit} from '@angular/core';
import {AnalyticsService} from "../analytics.service";
import {EmployeesInLocalesAnalytics} from "../domain/employees-in-locales-analytics";

@Component({
    selector: 'app-analytics',
    templateUrl: './analytics.component.html',
    styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {
    employeesInLocalesAnalytics: EmployeesInLocalesAnalytics[] = [];

    employeeData: any;
    basicOptions: any;

    constructor(
        private analyticsService: AnalyticsService,
    ) {
    }

    ngOnInit(): void {
        this.analyticsService.getEmployeeNumbersByLocale().subscribe({
            next: value => {
                // this.employeesInLocalesAnalytics = value;
                // console.log(value);
                // this.defineDatasets();
            }
        });
    }

    defineDatasets() {
        let datasets: any

        // console.log(this.employeesInLocalesAnalytics);

        this.employeesInLocalesAnalytics.forEach(e => {
            // console.log(e.employeesByMonth.entries());
            // datasets = [
            //     {
            //         label: e.locale.name,
            //         data: e.employeesByMonth.entries(),
            //         fill: false,
            //         borderColor: '#FFA726',
            //         tension: .4
            //     },
            // ]
        });

        this.employeeData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            datasets: datasets
            // [
            //     {
            //         label: '1st Locale',
            //         data: [65, 59, 80, 81, 56, 55, 40],
            //         fill: false,
            //         borderColor: '#FFA726',
            //         tension: .4
            //     },
            //     {
            //         label: '2nd Locale',
            //         data: [28, 48, 40, 19, 86, 27, 90, 27, 86, 53, 32, 63],
            //         fill: false,
            //         borderColor: '#42A5F5',
            //         tension: .4
            //     }
            // ]
        };
    }
}
