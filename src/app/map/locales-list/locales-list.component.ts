import {Component, Input} from '@angular/core';
import {Locale} from "../../domain/locale";

@Component({
    selector: 'app-locales-list',
    templateUrl: './locales-list.component.html',
    styleUrls: ['./locales-list.component.scss']
})
export class LocalesListComponent {
    @Input() locales: Locale[] = [];
}
