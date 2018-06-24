import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {AbstractFormControl, DynamicFormControlHidden} from './controls/abstract-form-control';
import {FormControlService} from './form-control.service';
import {Helper} from '../helper';

@Component({
    selector: 'app-dynamic-form-control',
    providers: [FormControlService],
    template: `
        <div [formGroup]="form" class="form-group row" [hidden]="shouldHide(control)">
            <label [attr.for]="control.key" class="col-sm-3 form-control-label">{{control.label}}</label>
            <div [ngSwitch]="control.controlType" class="col-sm-9">
                <input *ngSwitchCase="'textbox'" [formControlName]="control.key" [id]="control.key" [type]="control.type"
                       class="form-control" [placeholder]="control.placeholder" (change)="control.change($event, form)"
                       [checked]="control.value">
                <textarea *ngSwitchCase="'textarea'" [formControlName]="control.key" [id]="control.key" [rows]="control.rows"
                          class="form-control" [placeholder]="control.placeholder" (change)="control.change($event, form)"></textarea>
                <select [id]="control.key" *ngSwitchCase="'select'" [formControlName]="control.key" [compareWith]="helper.equals"
                        class="form-control" (change)="control.change($event, form)">
                    <option *ngFor="let opt of control.options" [ngValue]="opt.value">{{opt.label}}</option>
                </select>
            </div>
            <div class="errorMessage" *ngIf="!isValid">{{control.label}} is required</div>
        </div>`
})
export class DynamicFormControlComponent implements OnInit {

    @Input() control: AbstractFormControl<any>;
    @Input() form: FormGroup;
    helper = Helper;

    get isValid() {
        return this.form.controls[this.control.key].valid;
    }

    ngOnInit(): void {
    }

    shouldHide(control: AbstractFormControl<any>) {
        if (control.hide) {
            if (typeof control.hide === 'boolean') {
                return control.hide;
            } else {
                const when = (<DynamicFormControlHidden>control.hide).when;
                return Helper.equals(this.form.get(when.field).value, when.value);
            }
        }
        return false;
    }
}
