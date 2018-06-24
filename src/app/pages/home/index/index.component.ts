import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})

export class IndexComponent implements OnInit {

    constructor(protected authService: AuthService) {

    }

    ngOnInit() {
    }
}
