import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AbstractFormControl} from './controls/abstract-form-control';

@Injectable()
export class FormControlService {
    constructor() {
    }

    toFormGroup(controls: AbstractFormControl<any>[]) {
        const group: any = {};

        controls.forEach(control => {
            const formControl = control.required ? new FormControl(control.value || '', Validators.required)
                : new FormControl(control.value || '');
            group[control.key] = formControl;
        });
        return new FormGroup(group);
    }
}
