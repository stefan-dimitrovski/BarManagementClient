import {Component, OnInit} from '@angular/core';
import {PrimeNGConfig} from 'primeng/api';
import {AuthService} from "./auth.service";
import {Emitters} from "./emitters/emitters";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

    constructor(
        private primengConfig: PrimeNGConfig,
        private authService: AuthService) {
    }

    ngOnInit() {
        this.primengConfig.ripple = true;
        this.authService.getCurrentUser().subscribe({
            next: user => {
                console.log(user);
                Emitters.authEmitter.emit(true);
            },
            error: err => {
                console.error(err);
                Emitters.authEmitter.emit(false);
            }
        });
    }
}
