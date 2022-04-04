import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapComponent } from './map/map.component';
import { TablesComponent } from './tables/tables.component';

const routes: Routes = [
    { path: 'locales', component: MapComponent },
    { path: 'tables', component: TablesComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
