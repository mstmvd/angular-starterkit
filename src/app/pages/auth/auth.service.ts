import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../entity/user';
import {JsonConvert, ValueCheckingMode} from 'json2typescript';

import * as moment from 'moment';
import {Helper} from '../../util/helper';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    user: User;
    redirectUrl: string;

    constructor(private http: HttpClient) {
    }

    loginByEmail(email: string, password: string) {
        return this.http.post<User>('/api/auth/login', {email, password}).subscribe((res) => this.setSession(res));
    }

    loginByMobile(mobile: string, password: string) {
        return this.http.post<User>('/api/auth/login', {mobile, password}).subscribe((res) => this.setSession(res));
    }

    logout() {
        return this.http.delete<User>('/api/auth/logout').subscribe(() => this.removeSession());
    }

    removeSession() {
        localStorage.removeItem('token');
        localStorage.removeItem('expires_at');
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

    private setSession(res) {
        const data = Helper.parse_jwt(res.data.token);
        const jsonConvert: JsonConvert = new JsonConvert();
        jsonConvert.valueCheckingMode = ValueCheckingMode.ALLOW_NULL;
        this.user = jsonConvert.deserialize(data, User);
        const expires_at = data.exp;
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('expires_at', JSON.stringify(expires_at.valueOf()));
    }
}
