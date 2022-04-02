import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import {BadgeModule} from 'primeng/badge';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MapComponent } from './map/map.component';
import { TablesComponent } from './tables/tables.component';

@NgModule({
    declarations: [AppComponent, MapComponent, TablesComponent],
    imports: [
        HttpClientModule,
        BrowserModule,
        AppRoutingModule,
        ButtonModule,
        NgbModule,
        BadgeModule
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
