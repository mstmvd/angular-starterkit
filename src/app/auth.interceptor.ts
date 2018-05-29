import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>,
              next: HttpHandler): Observable<HttpEvent<any>> {

        const locale = localStorage.getItem('locale');
        if (locale) {
            req = req.clone({headers: req.headers.set('locale', locale)});
        }

        const token = localStorage.getItem('token');
        if (token) {
            req = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + token)});
        }

        return next.handle(req);
    }
}
