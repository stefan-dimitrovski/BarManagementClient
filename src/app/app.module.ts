import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ButtonModule} from 'primeng/button';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MapComponent} from './map/map.component';
import {LocalesListComponent} from './locales-list/locales-list.component';
import {VirtualScrollerModule} from 'primeng/virtualscroller';
import {CardModule} from 'primeng/card';

@NgModule({
    declarations: [AppComponent, MapComponent, LocalesListComponent],
    imports: [
        HttpClientModule,
        BrowserModule,
        ButtonModule,
        NgbModule,
        AppRoutingModule,
        VirtualScrollerModule,
        CardModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {
}
