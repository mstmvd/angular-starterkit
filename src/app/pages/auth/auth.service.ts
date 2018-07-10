import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../entity/user';
import {JsonConvert, ValueCheckingMode} from 'json2typescript';

import * as moment from 'moment';
import {Helper} from '../../util/helper';
import {ServerResponse} from '../../entity/server-response';
import {UserService} from '../../common/user.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    redirectUrl: string;

    constructor(private http: HttpClient, private userService: UserService) {
        if (this.isLoggedIn()) {
            const data = Helper.parse_jwt(localStorage.getItem('token'));
            this.userService.user = new User();
            this.userService.user.id = data.sub;
            this.userService.user.activeRole = localStorage.getItem('active_role');
            this.setUser(data.sub);
        }
    }

    loginByEmail(email: string, password: string) {
        return this.http.post<ServerResponse>('/api/auth/login', {email, password}).subscribe((res) => this.setSession(res.data.token));
    }

    loginByMobile(mobile: string, password: string) {
        return this.http.post<ServerResponse>('/api/auth/login', {mobile, password}).subscribe((res) => this.setSession(res.data.token));
    }

    removeSession() {
        localStorage.removeItem('token');
        localStorage.removeItem('expires_at');
        localStorage.removeItem('active_role');
        this.userService.user = null;
    }

    logout() {
        return this.http.delete<User>('/api/auth/logout').subscribe(() => this.removeSession());
    }

    private setSession(token) {
        const data = Helper.parse_jwt(token);
        const expires_at = data.exp;
        localStorage.setItem('token', token);
        localStorage.setItem('expires_at', JSON.stringify(expires_at.valueOf()));
        this.setUser(data.sub);
    }

    private setUser(id) {
        const jsonConvert: JsonConvert = new JsonConvert();
        jsonConvert.valueCheckingMode = ValueCheckingMode.ALLOW_NULL;
        const me = this;
        this.userService.show(id).subscribe(
            (response) => {
                me.userService.user = jsonConvert.deserialize(response.data, User);
                if (localStorage.getItem('active_role')) {
                    me.userService.user.activeRole = localStorage.getItem('active_role');
                }
            }
        );
    }

    public isLoggedIn() {
        return moment().isBefore(this.getExpiration());
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getExpiration() {
        return moment(Number(localStorage.getItem('expires_at')) * 1000);
    }
}
