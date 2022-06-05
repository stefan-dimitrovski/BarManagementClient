import {Component, AfterViewInit, Input} from '@angular/core';
import * as L from 'leaflet';
import {LocaleService} from '../locale.service';
import {Locale} from "../domain/locale";
import {LatLngTuple} from "leaflet";

const iconBusy = L.icon({
    iconUrl: 'assets/marker-icon-red.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
});

const iconFree = L.icon({
    iconUrl: 'assets/marker-icon-green.png',
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
    locales: Locale[] = [];

    @Input() flyToLatLng: LatLngTuple | null = null;

    constructor(private localeService: LocaleService) {
    }

    ngAfterViewInit(): void {
        this.initMap();
        this.localeService.getLocales()
            .subscribe({
                next: (data) => {
                    this.locales = data;

                    data.forEach((l) => {
                        const marker = L.marker([l.lat, l.lng], {
                            icon: l.id % 2 == 0 ? iconBusy : iconFree,
                        });

                        marker.bindPopup(this.makeCapitalPopup(l.lat, l.lng))
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

    flyTo(flyToLatLng: [number, number]): void {
        this.flyToLatLng = flyToLatLng;
        this.map?.flyTo(this.flyToLatLng, 15)
    }

    makeCapitalPopup(lat: number, lng: number): string {
        return `` +
            // `<div>Capital: ${data.name}</div>` +
            // `<div>State: ${data.state}</div>` +
            `<div>Lat: ${lat}</div>` +
            `<div>Lng: ${lng}</div>`
        // `<div>Population: ${data.population}</div>`
    }
}
