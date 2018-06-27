import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthRoutingModule} from './auth-routing.module';
import {LoginComponent} from './login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {LogoutComponent} from './logout/logout.component';
import {AuthService} from './auth.service';
import {SelectRoleComponent} from './login/select-role/select-role.component';
import {NbCardModule, NbLayoutModule} from '@nebular/theme';

@NgModule({
    imports: [
        CommonModule,
        AuthRoutingModule,
        ReactiveFormsModule,
        NbLayoutModule,
        NbCardModule
    ],
    declarations: [
        LoginComponent,
        LogoutComponent,
        SelectRoleComponent
    ],
    providers: [
        AuthService
    ]
})
export class AuthModule {
}
