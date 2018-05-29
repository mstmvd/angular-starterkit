import {Component} from '@angular/core';
import {AuthService} from './auth/auth.service';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {NbLayoutDirection, NbLayoutDirectionService} from '@nebular/theme';
import {Spinkit} from 'ng-http-loader';
import {Const} from './util/const';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    public spinkit = Spinkit;

    constructor(private authService: AuthService, private translate: TranslateService, layoutService: NbLayoutDirectionService) {
        const locale = localStorage.getItem('locale');
        if (locale) {
            translate.use(locale);
        } else {
            translate.setDefaultLang(Const.defaultLang);
            localStorage.setItem('locale', translate.currentLang);
        }
        translate.onLangChange.subscribe((event: LangChangeEvent) => {
            localStorage.setItem('locale', event.lang);
            if (Const.rtlLangs.includes(event.lang)) {
                layoutService.setDirection(NbLayoutDirection.RTL);
            } else {
                layoutService.setDirection(NbLayoutDirection.LTR);
            }
        });
    }

    isLoggedIn() {
        return this.authService.isLoggedIn();
    }

    changeLang(lang) {
        this.translate.use(lang);
    }

}
