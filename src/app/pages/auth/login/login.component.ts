import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    form: FormGroup;

    constructor(private fb: FormBuilder,
                private authService: AuthService,
                private router: Router) {

        this.form = this.fb.group({
            email_or_mobile: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    ngOnInit() {
    }

    login() {
        const val = this.form.value;

        if (val.email_or_mobile && val.password) {
            if (val.email_or_mobile.includes('@')) {
                this.authService.loginByEmail(val.email_or_mobile, val.password)
                    .add(
                        () => {
                            const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/dashboard';
                            this.router.navigateByUrl(redirect);
                        }
                    );
            } else {
                this.authService.loginByMobile(val.email_or_mobile, val.password)
                    .add(
                        () => {
                            const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/dashboard';
                            this.router.navigateByUrl(redirect);
                        }
                    );
            }
        }
    }
}
