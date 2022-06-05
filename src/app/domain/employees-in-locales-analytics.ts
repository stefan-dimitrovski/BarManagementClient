import {Locale} from "./locale";

export interface EmployeesInLocalesAnalytics {
    locale: Locale;
    employeesByMonth: [{ month: string; count: number }];
}
