import { Component, AfterViewInit, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { LocaleService } from '../locale.service';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
// const iconUrl = 'assets/marker-icon.png';
const iconUrl =
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
    iconRetinaUrl,
    iconUrl,
    shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = iconDefault;

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
                    const customIcon = L.divIcon({
                        html: `<a href="#"><img src="${iconUrl}" /></a>`,
                        className: '',
                    });
                    const marker = L.marker([l.lat, l.lng], {
                        icon: customIcon,
                    });

                    marker.addTo(this.map!!);
                });
            },
        });
    }

    initMap(): void {
        this.map = L.map('map', {
            center: [41.6086, 21.7453],
            zoom: 9,
        });

        const tiles = L.tileLayer(
            'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            {
                maxZoom: 18,
                minZoom: 3,
                attribution:
                    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            }
        );
        tiles.addTo(this.map);
    }
}
