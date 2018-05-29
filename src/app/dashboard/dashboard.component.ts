import {Component, OnDestroy, OnInit} from '@angular/core';
import {NbMenuItem} from '@nebular/theme';
import {ToasterConfig} from 'angular2-toaster';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {Const} from '../util/const';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

    menu_items: NbMenuItem[] = [];
    toasterConfig: ToasterConfig = Const.toasterConfig;
    transSub: any;

    constructor(public translate: TranslateService) {
        this.fillMenuItems();
    }

    ngOnInit() {
        this.transSub = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
            this.fillMenuItems();
        });
    }

    ngOnDestroy(): void {
        this.transSub.unsubscribe();
    }

    private fillMenuItems() {
        this.menu_items = [];
        this.translate.get('sample_title').subscribe(value => this.menu_items.push({title: value, link: 'sample'}));
    }
}
