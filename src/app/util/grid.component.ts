import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {AbstractEntity} from '../entity/abstract-entity';
import {Subject} from 'rxjs';
import {DataTableDirective} from 'angular-datatables';
import {Const} from './const';
import {Pagination} from './pagination';
import {TranslateService} from '@ngx-translate/core';
import {AbstractEntityService} from './abstract-entity.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-grid',
    template: `
        <table datatable [dtOptions]="dtOptions" [dtTrigger]="dtTrigger" class="row-border hover" width="100%">
            <thead *ngIf="entities?.length > 0">
            <tr>
                <ng-container *ngFor="let key of this.entityKeys">
                    <td *ngIf="key !== 'actions'" [translate]="this.translatePrefix + key"></td>
                </ng-container>
                <td *ngIf="this.entityGridOptions['actions'] && entities[0].actions" [translate]="'grid.actions'"></td>
            </tr>
            </thead>
            <tbody>
            <tr *ngFor="let entity of this.entities">
                <ng-container *ngFor="let key of this.entityKeys">
                    <td *ngIf="key !== 'actions'" [innerHtml]="render(entity, key)"></td>
                </ng-container>
                <td *ngIf="this.entityGridOptions['actions'] && entity.actions">
                    <ng-container *ngFor="let action of this.entityGridOptions['actions']['actions']">
                        <ng-container *ngIf="action.type; then defaultActions else customActions"></ng-container>
                        <ng-template #defaultActions>
                            <span [ngSwitch]="action.type">
                                <i *ngSwitchCase="'update'"
                                   style="cursor: pointer; color: darkorange"
                                   [class]="'grid-btn fa fa-2x fa-edit'"
                                   (click)="doAction('update', entity)" [title]="'button.update' | translate"></i>
                                <i *ngSwitchCase="'destroy'"
                                   style="cursor: pointer; color: darkred"
                                   [class]="'grid-btn fa fa-2x fa-trash'"
                                   (click)="doAction('destroy', entity)" [title]="'button.destroy' | translate"></i>
                            </span>
                        </ng-template>
                        <ng-template #customActions>
                            <i style="cursor: pointer"
                               [class]="'grid-btn fa fa-2x ' + action.class"
                               (click)="action.routerLink ? routerFunc(entity, action.routerLink(entity))
                               : (action.click ? action.click(entity)
                               : (action.doAction ? doAction(action.doAction, entity) : null))"
                               [title]="action.title | translate"></i>
                        </ng-template>
                    </ng-container>
                </td>
            </tr>
            <tr *ngIf="this.entities?.length == 0">
                <td [attr.colspan]="this.entityKeys.length + 1" class="no-data-available" [translate]="'grid.no_data'"></td>
            </tr>
            </tbody>
        </table>
    `,
})
export class GridComponent<Entity extends AbstractEntity> implements OnInit, OnChanges {
    @ViewChild(DataTableDirective)
    dtElement: DataTableDirective;

    @Input()
    entities: AbstractEntity[];
    @Input()
    dtOptions: DataTables.Settings = {};
    @Input()
    dtTrigger: Subject<any> = new Subject();
    @Input()
    entityService: AbstractEntityService<Entity>;

    @Output()
    action: EventEmitter<any> = new EventEmitter<any>();

    entityKeys = [];

    translatePrefix = '';

    entityGridOptions = {};

    constructor(private translate: TranslateService, private router: Router, private route: ActivatedRoute) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['entities']) {
            if (this.entities.length > 0) {
                const me = this;
                this.translatePrefix = 'entity.' + this.entities[0].constructor.name + '.';
                this.entityKeys = [];
                Object.keys(this.entities[0]).forEach(function (value, index, array) {
                    const option = getGrid(me.entities[0], value);
                    if (option) {
                        me.entityKeys.push(value);
                        me.entityGridOptions[value] = option;
                    }
                });
            }
            this.dtRender();
        }
    }

    ngOnInit(): void {
        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: Pagination.DEFAULT_PER_PAGE,
            retrieve: true,
            language: {
                url: '//cdn.datatables.net/plug-ins/1.10.16/i18n/' + Const.dtLangFile[this.translate.currentLang] + '.json'
            }
        };
    }

    doAction(name, entity) {
        this.entityService.entity = entity;
        this.action.emit({name: name, value: entity});
    }

    dtRender(): void {
        if (this.entities.length > 0) {
            this.dtOptions = {
                pagingType: 'full_numbers',
                pageLength: Pagination.DEFAULT_PER_PAGE,
                retrieve: true,
                language: {
                    url: '//cdn.datatables.net/plug-ins/1.10.16/i18n/' + Const.dtLangFile[this.translate.currentLang] + '.json'
                }
            };
            this.dtTrigger.next();
        }
    }

    render(entity, key) {
        if (this.entityGridOptions[key] && this.entityGridOptions[key].render && entity[key]) {
            return this.entityGridOptions[key].render(entity[key], entity);
        } else {
            return entity[key];
        }
    }

    routerFunc(entity, route) {
        this.entityService.entity = entity;
        this.router.navigate(route.split('/'), {relativeTo: this.route});
    }
}

export interface GridOption {
    render?: Function;
    actions?: ({
        title?: string; // will be translated
        class?: string; // fontAwesome class name
        routerLink?: Function;
        click?: Function;
        doAction?: string;
    } | {
        type: 'update' | 'destroy';
    })[];
}

export function Grid(option?: GridOption) {
    return Reflect.metadata(Const.gridMetadataKey, option || {});
}

export function getGrid(target: any, propertyKey: string) {
    return Reflect.getMetadata(Const.gridMetadataKey, target, propertyKey);
}
