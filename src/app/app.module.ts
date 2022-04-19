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
import {RippleModule} from "primeng/ripple";
import {StorageComponent} from './storage/storage.component';
import {AnalyticsComponent} from './analytics/analytics.component';
// import {ChartModule} from "primeng/chart";
import {NoLocaleComponent} from './no-locale/no-locale.component';
import {PickListModule} from 'primeng/picklist';
import {InputNumberModule} from 'primeng/inputnumber';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from "@angular/material/input";


@NgModule({
    declarations: [AppComponent, MapComponent, LocalesListComponent, TablesComponent, OrderComponent, NavbarComponent, RegisterFormComponent, LoginFormComponent, EmployeesComponent, StorageComponent, AnalyticsComponent, NoLocaleComponent],
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
        RippleModule,
        PickListModule,
        InputNumberModule,
        MatCardModule,
        MatInputModule,
        // ChartModule,
    ],
    providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}],
    bootstrap: [AppComponent],
})
export class AppModule {
}
