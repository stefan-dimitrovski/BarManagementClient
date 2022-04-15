import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {Emitters} from "../emitters/emitters";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, AfterViewInit {
    authenticated = false;
    email: string | null = null;

    constructor(
        private authService: AuthService) {
    }

    ngOnInit(): void {
        Emitters.authEmitter.subscribe(auth => {
            if (auth) {
                this.authenticated = true;
                this.email = this.authService.getEmail();
            } else {
                this.authenticated = false;
                this.email = null;
            }
        });
    }

    logout() {
        this.authService.logoutUser();
    }

    ngAfterViewInit(): void {
        const auth = this.authService.isLoggedIn();
        if (auth) {
            this.authenticated = true;
            this.email = this.authService.getEmail();
        } else {
            this.authenticated = false;
            this.email = null;
        }

    }

}
