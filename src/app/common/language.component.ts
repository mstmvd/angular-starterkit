import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {NbMenuService} from '@nebular/theme';
import {filter, map} from 'rxjs/internal/operators';

@Component({
    selector: 'app-language',
    template: `
        <button class="btn text-dark"
                [nbContextMenu]="languages" [nbContextMenuTag]="'language-context-menu'">{{currentLang}}
        </button>
    `
})

export class LanguageComponent implements OnInit {

    languages = [
        {title: 'FA'},
        {title: 'EN'},
    ];
    currentLang;

    constructor(protected translate: TranslateService, private nbMenuService: NbMenuService) {
        this.currentLang = this.translate.currentLang;
    }

    changeLang(lang) {
        this.translate.use(lang.toLowerCase());
        this.currentLang = lang;
    }

    ngOnInit() {
        this.nbMenuService.onItemClick()
            .pipe(
                filter(({tag}) => tag === 'language-context-menu'),
                map(({item: {title}}) => title),
            )
            .subscribe(title => this.changeLang(title));
    }
}
