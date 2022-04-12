import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../auth.service";
import {Router} from "@angular/router";
import {Emitters} from "../../emitters/emitters";

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
    loginForm = new FormGroup({
        email: new FormControl('', Validators.email),
        password: new FormControl('', Validators.minLength(8)),
    });

    constructor(
        private authService: AuthService,
        private router: Router) {
    }

    onSubmit(): void {
        this.authService.loginUser(this.loginForm.value).subscribe({
            next: value => {
                Emitters.authEmitter.emit(true);
                this.loginForm.reset();
                localStorage.setItem("token", value.token);
                localStorage.setItem("id", value.id);
                localStorage.setItem("email", value.email);
                localStorage.setItem("name", value.name);
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
