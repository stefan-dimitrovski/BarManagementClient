import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BadgeModule} from 'primeng/badge';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ButtonModule} from 'primeng/button';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MapComponent} from './map/map.component';
import {LocalesListComponent} from './locales-list/locales-list.component';
import {VirtualScrollerModule} from 'primeng/virtualscroller';
import {CardModule} from 'primeng/card';
import {TablesComponent} from './tables/tables.component';
import {TooltipModule} from 'primeng/tooltip';
import {OrderComponent} from './order/order.component';
import {NavbarComponent} from './navbar/navbar.component';
import {RegisterFormComponent} from './auth/register-form/register-form.component';
import {LoginFormComponent} from './auth/login-form/login-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthInterceptorService} from "./auth-interceptor.service";
import {EmployeesComponent} from './employees/employees.component';
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {SkeletonModule} from "primeng/skeleton";
import {TableModule} from "primeng/table";
import {ProgressBarModule} from "primeng/progressbar";
import {InputTextModule} from "primeng/inputtext";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {OverlayPanelModule} from "primeng/overlaypanel";

@NgModule({
    declarations: [AppComponent, MapComponent, LocalesListComponent, TablesComponent, OrderComponent, NavbarComponent, RegisterFormComponent, LoginFormComponent, EmployeesComponent],
    imports: [
        HttpClientModule,
        BrowserModule,
        AppRoutingModule,
        ButtonModule,
        NgbModule,
        VirtualScrollerModule,
        CardModule,
        BadgeModule,
        TooltipModule,
        FormsModule,
        ReactiveFormsModule,
        ProgressSpinnerModule,
        SkeletonModule,
        TableModule,
        ProgressBarModule,
        InputTextModule,
        BrowserAnimationsModule,
        OverlayPanelModule,
    ],
    providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}],
    bootstrap: [AppComponent],
})
export class AppModule {
}
