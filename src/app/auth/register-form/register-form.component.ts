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
    registerForm = new FormGroup({
        name: new FormControl('', Validators.minLength(2)),
        email: new FormControl('', Validators.email),
        phoneNumber: new FormControl(''),
        password: new FormControl('', Validators.minLength(8)),
        confirmPassword: new FormControl('', Validators.minLength(8))
    }, {validators: matchingPasswordValidator});

    constructor(
        private authService: AuthService,
        private router: Router) {
    }

    onSubmit() {
        this.authService.registerUser(this.registerForm.value).subscribe({
            next: () => {
                this.registerForm.reset();
                this.router.navigate(['/login']);
            },
            error: err => {
                //TODO: Error Handling
                console.error("Something went wrong");
                console.error(err);
            }
        });
    }

}
