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
                this.employeesInLocalesAnalytics = value;
                this.defineDatasets();
            }
        });
    }

    defineDatasets() {
        let datasets: any[] = []

        this.employeesInLocalesAnalytics.forEach(e => {

            datasets.push({
                label: e.locale.name,
                data: Object.values(e.employeesByMonth),
                fill: false,
                borderColor: this.generateColor(),
                tension: .4
            })
        });

        this.employeeData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            datasets: datasets
        };
    }

    generateColor() {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

}
