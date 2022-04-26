import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../auth.service";

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
    loginForm: FormGroup;
    errorMsg: string | null = null;

    constructor(
        private authService: AuthService) {

        this.loginForm = new FormGroup({
            email: new FormControl('', Validators.email),
            password: new FormControl('', Validators.minLength(8)),
        });
    }

    onSubmit(): void {
        this.authService.loginUser(this.loginForm.value).subscribe({
            next: value => {
                this.loginForm.reset();
                this.authService.saveUserToLocalStorage(value);
            }, error: err => {
                this.errorMsg = err.error;
            }
        });
    }
}
