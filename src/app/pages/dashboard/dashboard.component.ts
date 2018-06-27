import {Component, OnDestroy, OnInit} from '@angular/core';
import {NbMenuItem, NbMenuService} from '@nebular/theme';
import {ToasterConfig} from 'angular2-toaster';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {Const} from '../../util/const';
import {UserService} from '../../common/user.service';
import {filter, map} from 'rxjs/internal/operators';
import {Router} from '@angular/router';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

    menu_items: NbMenuItem[] = [];
    toasterConfig: ToasterConfig = Const.toasterConfig;
    transSub: any;
    userMenuItems = [/*{title: 'change role' }, */{title: 'logout'}];

    constructor(public translate: TranslateService, protected userService: UserService, private nbMenuService: NbMenuService,
                private router: Router) {
        this.fillMenuItems();
    }

    ngOnInit() {
        this.transSub = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
            this.fillMenuItems();
        });
        this.nbMenuService.onItemClick()
            .pipe(
                filter(({tag}) => tag === 'user-context-menu'),
                map(({item: {title}}) => title),
            )
            .subscribe(title => {
                switch (title) {
                    case 'change role':
                        this.router.navigateByUrl('/auth/login');
                        break;
                    case 'logout':
                        this.router.navigateByUrl('/auth/logout');
                        break;
                }
            });
    }

    private fillMenuItems() {
        this.menu_items = [];
        this.translate.get('dashboard.menu.sample').subscribe(value => this.menu_items.push({title: value, link: 'sample'}));
    }

    ngOnDestroy(): void {
        this.transSub.unsubscribe();
    }
}
