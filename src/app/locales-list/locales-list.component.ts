import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Locale} from "../domain/locale";
import {LatLngTuple} from "leaflet";

@Component({
    selector: 'app-locales-list',
    templateUrl: './locales-list.component.html',
    styleUrls: ['./locales-list.component.scss']
})
export class LocalesListComponent {
    @Input() locales: Locale[] = [];
    @Output() flyToLatLng = new EventEmitter<LatLngTuple>();

    flyTo(lat: number, lng: number) {
        this.flyToLatLng.emit([lat, lng]);
    }
}
