import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {Emitters} from "../emitters/emitters";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    authenticated = false;
    email: string | null = null;

    constructor(
        private authService: AuthService) {
    }

    ngOnInit(): void {
        Emitters.authEmitter.subscribe(auth => {
            this.authenticated = auth;
            if (auth) {
                this.email = this.authService.getEmail();
            } else {
                this.email = null;
            }
        });
    }

    logout() {
        this.authService.logoutUser();
    }

}
