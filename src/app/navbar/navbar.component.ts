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
    role: string | null = null;
    email: string | null = null;

    constructor(
        private authService: AuthService) {
    }

    ngOnInit(): void {
        const auth = this.authService.isLoggedIn();
        this.checkAuth(auth);

        Emitters.authEmitter.subscribe(auth => {
            this.checkAuth(auth);
        });
    }

    logout() {
        this.authService.logoutUser();
    }

    checkAuth(isAuth: boolean) {
        if (isAuth) {
            this.authenticated = true;
            this.email = this.authService.getEmail();
            this.role = this.authService.getRole();
        } else {
            this.authenticated = false;
            this.email = null;
            this.role = null;
        }
    }

}
