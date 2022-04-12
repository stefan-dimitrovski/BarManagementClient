import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MapComponent} from './map/map.component';
import {TablesComponent} from './tables/tables.component';
import {RegisterFormComponent} from "./auth/register-form/register-form.component";
import {LoginFormComponent} from "./auth/login-form/login-form.component";
import {OrderComponent} from "./order/order.component";

const routes: Routes = [
    {path: '', component: RegisterFormComponent},
    {path: 'register', component: RegisterFormComponent},
    {path: 'login', component: LoginFormComponent},
    {path: 'locales', component: MapComponent},
    {path: 'orders', component: OrderComponent},
    {path: 'locale/:id/tables', component: TablesComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
