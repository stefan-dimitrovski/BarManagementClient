import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MapComponent } from './map/map.component';

@NgModule({
    declarations: [AppComponent, MapComponent],
    imports: [BrowserModule, AppRoutingModule, ButtonModule, NgbModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
