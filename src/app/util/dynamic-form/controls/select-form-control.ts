import {AbstractFormControl, AbstractFormControlOptions} from './abstract-form-control';
import {Helper} from '../../helper';

interface SelectOption {
    label: string;
    value: any;
}

interface SelectFormControlOptions extends AbstractFormControlOptions<any> {
    options?: SelectOption[];
}

export class SelectFormControl extends AbstractFormControl<any> {
    controlType = 'select';
    options: SelectOption[] = [];

    constructor(options: SelectFormControlOptions = {}) {
        super(options);
        this.options = options.options || [];
    }

    fillData(service) {
        const me = this;
        if (me.dataService) {
            service.index(me.dataService.params).subscribe(val => {
                const entities = Helper.convertToEntities(val.data, me.dataService.entity);
                me.options = [];
                entities.forEach((entity) => {
                    me.options.push({value: entity, label: entity.toString()});
                });
            });
        }
    }
}
