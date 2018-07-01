import {Component} from '@angular/core';
import {AuthService} from './pages/auth/auth.service';
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
        translate.setDefaultLang(Const.defaultLang);
        const locale = localStorage.getItem('locale');
        if (locale) {
            translate.use(locale);
        } else {
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
}
