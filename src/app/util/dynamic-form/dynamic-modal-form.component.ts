import {Component, Injector, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AbstractEntity} from '../../entity/abstract-entity';
import {FormGroup} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {AbstractFormControl} from './controls/abstract-form-control';
import {FormControlService} from './form-control.service';
import {getDynamicFormControl} from './dynamic-form';
import {lower} from 'case';

@Component({
    providers: [FormControlService],
    selector: 'app-modal-form',
    template: `
        <div class="modal-header">
            <span>{{modalHeader}}</span>
            <button class="close" aria-label="Close" (click)="closeModal()">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <ng-container *ngIf="entity">
                <form [formGroup]="form" class="form-horizontal">
                    <div *ngFor="let c of this.controls">
                        <app-dynamic-form-control [control]="c" [form]="form"></app-dynamic-form-control>
                    </div>
                </form>
            </ng-container>
        </div>
        <div class="modal-footer">
            <button class="btn btn-md btn-primary" (click)="submit()" [translate]="'button.save'" [disabled]="!form.valid"></button>
        </div>
    `,
})
export class DynamicModalFormComponent<Entity extends AbstractEntity> implements OnInit {

    modalHeader: string;
    @Input()
    entity: Entity;
    controls = [];
    form: FormGroup;

    constructor(private activeModal: NgbActiveModal, private translate: TranslateService, private formControlService: FormControlService,
                private injector: Injector) {
    }

    ngOnInit(): void {
        this.controls = this.createFrom();
        this.form = this.formControlService.toFormGroup(this.controls);
    }

    closeModal() {
        this.activeModal.dismiss('close button');
    }

    submit() {
        if (this.form.valid) {
            this.activeModal.close(this.controls);
        }
    }

    createFrom() {
        const formModel: AbstractFormControl<any>[] = [];
        const me = this;
        Object.keys(this.entity).forEach(function (value, index, array) {
            const control: AbstractFormControl<any> = getDynamicFormControl(me.entity, value);
            if (control !== undefined && control.controlType !== undefined) {
                control.value = me.entity[value];
                control.key = value;
                me.translate.stream('entity.' + me.entity.constructor.name + '.' + value).subscribe(res => {
                    control.label = res;
                    control.placeholder = res;
                });
                if (control.dataService) {
                    control.fillData(me.injector.get(control.dataService.service));
                }
                formModel.push(control);
            }
        });
        return formModel;
    }
}
