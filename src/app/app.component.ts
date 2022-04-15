import {Component, OnInit} from '@angular/core';
import {PrimeNGConfig} from 'primeng/api';
import {Emitters} from "./emitters/emitters";
import {Router} from "@angular/router";
import {AuthService} from "./auth.service";
import {Role} from "./domain/role";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    constructor(
        private primengConfig: PrimeNGConfig,
        private router: Router,
        private authService: AuthService) {
    }

    ngOnInit() {
        this.primengConfig.ripple = true;
        Emitters.authEmitter.subscribe(
            auth => {
                if (auth) {
                    if (this.authService.getRole() == Role.WAITER) {
                        this.router.navigate(['/orders']);
                    } else if (this.authService.getRole() == Role.MANAGER) {
                        this.router.navigate(['/locales']);
                    }
                } else {
                    this.router.navigate(['/login']);
                }
            }
        )
    }
}
