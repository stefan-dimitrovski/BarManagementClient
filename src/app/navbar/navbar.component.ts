import {Component, Input, OnInit} from '@angular/core';
import {Emitters} from "../emitters/emitters";
import {AuthService} from "../auth.service";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    authenticated = false;
    @Input() email: string | null = null;

    constructor(
        private authService: AuthService) {
    }

    ngOnInit(): void {
        Emitters.authEmitter.subscribe(
            (auth: boolean) => {
                this.authenticated = auth;
            }
        );

        this.authService.getCurrentUser().subscribe({
            next: value => {
                console.log(value);
                this.email = value.email;
            }
        })
    }

    logout() {
        this.authService.logoutUser().subscribe({
            next: () => {
                this.authenticated = false;
            },
            error: err => {
                console.error(err);
            }
        })
    }

}
