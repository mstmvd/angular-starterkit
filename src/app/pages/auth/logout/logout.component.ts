import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

    constructor(private authService: AuthService,
                private router: Router) {
    }

    ngOnInit() {
    }

    logout() {
        if (this.authService.isLoggedIn()) {
            this.authService.logout().add(() => {
                console.log('User is logged out');
                this.router.navigateByUrl('/');
            });
        }
    }
}
