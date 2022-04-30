import {Component, OnInit} from '@angular/core';
import {AnalyticsService} from "../analytics.service";
import {EmployeesInLocalesAnalytics} from "../domain/employees-in-locales-analytics";
import {forkJoin} from "rxjs";

@Component({
    selector: 'app-analytics',
    templateUrl: './analytics.component.html',
    styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {
    isLoading = true;
    employeeData: any;
    drinksData: any;

    constructor(
        private analyticsService: AnalyticsService,
    ) {
    }

    ngOnInit(): void {
        forkJoin({
            employeeData: this.analyticsService.getEmployeeNumbersByLocale(),
            drinksData: this.analyticsService.getDrinksByPopularity(),
        }).subscribe({
            next: value => {
                this.isLoading = false;
                this.defineEmployeeDatasets(value.employeeData);
                this.defineDrinksDatasets(value.drinksData);
            }
        })
    }

    defineEmployeeDatasets(employeesInLocalesAnalytics: EmployeesInLocalesAnalytics[]) {
        let datasets: any[] = []

        employeesInLocalesAnalytics.forEach(e => {

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

    defineDrinksDatasets(drinksByPopularity: any[]) {
        this.drinksData = {
            labels: ['Beer', 'Whiskey', 'Vodka', 'Wine'],
            datasets: [
                {
                    data: [300, 50, 100, 25],
                    backgroundColor: [
                        "#42A5F5",
                        "#66BB6A",
                        "#FFA726",
                        "#FF4353",
                    ],
                }
            ]
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
