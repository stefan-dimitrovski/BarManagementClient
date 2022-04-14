import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MapComponent} from './map/map.component';
import {TablesComponent} from './tables/tables.component';
import {RegisterFormComponent} from "./auth/register-form/register-form.component";
import {LoginFormComponent} from "./auth/login-form/login-form.component";
import {OrderComponent} from "./order/order.component";
import {EmployeesComponent} from "./employees/employees.component";
import {AuthGuard} from "./auth.guard";

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
        path: 'orders', component: OrderComponent, canActivate: [AuthGuard], data: {
            role: ['WAITER', 'MANAGER']
        }
    },
    {
        path: 'employees', component: EmployeesComponent, canActivate: [AuthGuard], data: {
            role: 'MANAGER'
        }
    },
    {
        path: 'locale/:id/tables', component: TablesComponent, canActivate: [AuthGuard], data: {
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
