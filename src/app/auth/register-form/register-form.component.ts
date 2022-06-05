import {Component} from '@angular/core';
import {
    FormControl,
    FormGroup,
    Validators
} from "@angular/forms";
import {matchingPasswordValidator} from "../validators/matching-passwords";
import {AuthService} from "../../auth.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-register-form',
    templateUrl: './register-form.component.html',
    styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent {
    registerForm: FormGroup;
    errorMsg: string | null = null;

    constructor(
        private authService: AuthService,
        private router: Router) {

        this.registerForm = new FormGroup({
            name: new FormControl('', [Validators.minLength(2), Validators.required]),
            email: new FormControl('', [Validators.email, Validators.required]),
            phoneNumber: new FormControl('', Validators.required),
            password: new FormControl('', [Validators.minLength(8), Validators.required]),
            confirmPassword: new FormControl('', [Validators.minLength(8), Validators.required])
        }, {validators: matchingPasswordValidator})
    }

    onSubmit() {
        this.authService.registerUser(this.registerForm.value).subscribe({
            next: () => {
                this.registerForm.reset();
                this.router.navigate(['/login']);
            },
            error: err => {
                this.errorMsg = err.error;
                console.error(err);
            }
        });
    }

}
