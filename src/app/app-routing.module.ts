import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MapComponent} from './map/map.component';
import {TablesComponent} from './tables/tables.component';
import {RegisterFormComponent} from "./auth/register-form/register-form.component";
import {LoginFormComponent} from "./auth/login-form/login-form.component";
import {OrderComponent} from "./order/order.component";
import {EmployeesComponent} from "./employees/employees.component";
import {AuthGuard} from "./auth.guard";
import {StorageComponent} from "./storage/storage.component";
import {AnalyticsComponent} from "./analytics/analytics.component";
import {NoLocaleComponent} from "./no-locale/no-locale.component";
import {OrderListComponent} from "./order-list/order-list.component";

const routes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'register', component: RegisterFormComponent},
    {path: 'login', component: LoginFormComponent},
    {
        path: 'locales', component: MapComponent, canActivate: [AuthGuard], data: {
            role: 'MANAGER'
        }
    },
    {
        path: 'storage/:id', component: StorageComponent, canActivate: [AuthGuard], data: {
            role: 'MANAGER'
        }
    },
    {
        path: 'orders', component: OrderComponent, canActivate: [AuthGuard], data: {
            role: 'WAITER'
        }
    },
    {
        path: 'order-list', component: OrderListComponent, canActivate: [AuthGuard], data: {
            role: 'MANAGER'
        }
    },
    {
        path: 'employees', component: EmployeesComponent, canActivate: [AuthGuard], data: {
            role: 'MANAGER'
        }
    },
    {
        path: 'analytics', component: AnalyticsComponent, canActivate: [AuthGuard], data: {
            role: 'MANAGER'
        }
    },
    {
        path: 'locale/:id/tables', component: TablesComponent, canActivate: [AuthGuard], data: {
            role: ['WAITER', 'MANAGER']
        }
    },
    {
        path: 'tables/:tableId', component: OrderComponent, canActivate: [AuthGuard], data: {
            role: ['WAITER', 'MANAGER']
        }
    },
    {
        path: 'no-locale', component: NoLocaleComponent, canActivate: [AuthGuard], data: {
            role: ['WAITER', 'MANAGER']
        }
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
