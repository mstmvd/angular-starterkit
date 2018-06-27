import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {AbstractEntity} from '../entity/abstract-entity';
import {Subject} from 'rxjs';
import {DataTableDirective} from 'angular-datatables';
import {Const} from './const';
import {lower} from 'case';

@Component({
    selector: 'app-grid',
    template: `
        <table datatable [dtOptions]="dtOptions" [dtTrigger]="dtTrigger" class="row-border hover" width="100%">
            <thead>
            <tr>
                <ng-container *ngFor="let key of this.entityKeys">
                    <td *ngIf="key !== 'actions'" [translate]="this.translatePrefix + key"></td>
                </ng-container>
                <td *ngIf="this.entityGridOptions['actions']" [translate]="'grid.actions'"></td>
            </tr>
            </thead>
            <tbody>
            <tr *ngFor="let entity of this.entities">
                <ng-container *ngFor="let key of this.entityKeys">
                    <td *ngIf="key !== 'actions'" [innerHtml]="render(entity, key)"></td>
                </ng-container>
                <td *ngIf="this.entityGridOptions['actions']">
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
                            <i [routerLink]="action.routerLink ? action.routerLink(entity) : null" style="cursor: pointer"
                               [class]="'grid-btn fa fa-2x ' + action.class"
                               (click)="action.click ? action.click() : null" [title]="action.title | translate"></i>
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

    @Output()
    action: EventEmitter<any> = new EventEmitter<any>();

    entityKeys = [];

    translatePrefix = '';

    entityGridOptions = {};

    constructor() {
    }

    ngOnInit(): void {
    }


    ngOnChanges(changes: SimpleChanges): void {
        if (changes['entities']) {
            if (this.entities.length > 0) {
                const me = this;
                this.translatePrefix = 'entity.' + this.entities[0].constructor.name + '.';
                Object.keys(this.entities[0]).forEach(function (value, index, array) {
                    const option = getGrid(me.entities[0], value);
                    if (option) {
                        me.entityKeys.push(value);
                        me.entityGridOptions[value] = option;
                    }
                });
            }
        }
        this.dtRender();
    }

    doAction(name, value) {
        this.action.emit({name: name, value: value});
    }

    dtRender(): void {
        if (this.dtElement.dtInstance) {
            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                dtInstance.destroy();
                this.dtTrigger.next();
            });
        } else {
            this.dtTrigger.next();
        }
    }

    render(entity, key) {
        if (this.entityGridOptions[key] && this.entityGridOptions[key].render) {
            return this.entityGridOptions[key].render(entity[key]);
        } else {
            return entity[key];
        }
    }
}

export interface GridOption {
    render?: Function;
    actions?: ({
        class?: string; // fontAwesome class name
        routerLink?: Function;
        title?: string; // will be translated
        click?: Function;
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
