import {Injectable, Injector} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './pages/auth/auth.service';
import {Observable, of} from 'rxjs';
import {Const} from './util/const';
import {UserService} from './common/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private injector: Injector, private userService: UserService,
                private authService: AuthService, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const url: string = state.url;
        let res;
        if (this.checkLogin(url)) {
            if (route.component) {
                const option: AuthOption = getAuth(this.injector.get(route.component).constructor);
                res = option.roles.indexOf(this.userService.user.activeRole) >= 0;
            } else {
                res = true;
            }
        } else {
            // Store the attempted URL for redirecting
            this.authService.redirectUrl = url;
            // Navigate to the index page with extras
            this.router.navigate(['auth/login']);
            res = false;
        }
        return of(res);
    }

    checkLogin(url: string): boolean {
        if (this.authService.isLoggedIn() && this.userService.user && this.userService.user.activeRole) {
            return true;
        }
        return false;
    }
}

interface AuthOption {
    roles: string[];
}

export function Auth(option: AuthOption) {
    return Reflect.metadata(Const.authMetadataKey, option);
}

export function getAuth(target: any) {
    return Reflect.getMetadata(Const.authMetadataKey, target);
}
