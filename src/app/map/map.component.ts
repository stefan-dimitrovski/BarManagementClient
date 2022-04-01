import {Component, AfterViewInit} from '@angular/core';
import * as L from 'leaflet';
import {LocaleService} from '../locale.service';

const iconDefault = L.icon({
    iconUrl: 'assets/marker-icon-red.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
});

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit {
    map: L.Map | null = null;

    constructor(private localeService: LocaleService) {}

    ngAfterViewInit(): void {
        this.initMap();
        this.localeService.getLocales(this.map!!).subscribe({
            next: (data) => {
                data.forEach((l) => {

                    const marker = L.marker([l.lat, l.lng], {
                        icon: iconDefault,
                    });

                    marker.addTo(this.map!!)
                });
            },
        });
    }

    initMap(): void {
        this.map = L.map('map', {
            center: [41.6086, 21.7453],
            zoom: 8.5,
        });

        const tiles = L.tileLayer(
            'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            {
                maxZoom: 18,
                minZoom: 3,
            }
        );
        tiles.addTo(this.map);
    }
}
