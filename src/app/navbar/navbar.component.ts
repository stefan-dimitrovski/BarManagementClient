import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";

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
        //TODO Implement email change when user logged in
    }

    logout() {
        this.authService.logoutUser();
    }

}
