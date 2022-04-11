import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../auth.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
    loginForm = new FormGroup({
        email: new FormControl('', Validators.email),
        password: new FormControl('', Validators.minLength(8)),
    });

    constructor(
        private authService: AuthService,
        private router: Router) {
    }

    ngOnInit(): void {
    }

    onSubmit(): void {
        this.authService.loginUser(this.loginForm.value).subscribe({
            next: () => {
                this.loginForm.reset();
                this.router.navigate(['/locales']);
            },
            error: err => {
                //TODO: Error Handling
                console.error("Something went wrong");
                console.error(err);
            }
        })
    }

}
