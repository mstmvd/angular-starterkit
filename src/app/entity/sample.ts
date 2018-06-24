import {JsonObject, JsonProperty} from 'json2typescript';
import {AbstractEntity} from './abstract-entity';
import {DynamicFormControl} from '../util/dynamic-form/dynamic-form';
import {InputFormControl} from '../util/dynamic-form/controls/input-form-control';
import {Grid} from '../util/grid.component';
import {TextareaFormControl} from '../util/dynamic-form/controls/textarea-form-control';
import {SelectFormControl} from '../util/dynamic-form/controls/select-form-control';
import {User} from './user';
import {UserService} from '../common/user.service';
import {Validators} from '@angular/forms';

@JsonObject
export class Sample extends AbstractEntity {

    @JsonProperty('title', String)
    @DynamicFormControl(new InputFormControl({
        type: 'text', hide: false,
        validators: [Validators.required, Validators.minLength(1), Validators.maxLength(3)]
    })) @Grid()
    title: string = undefined;

    @JsonProperty('description', String)
    @DynamicFormControl(new TextareaFormControl())
    @Grid()
    description: string = undefined;

    @JsonProperty('static_select', String)
    @DynamicFormControl(new SelectFormControl({
        options: [
            {
                label: 'option1',
                value: 'value1'
            },
            {
                label: 'option2',
                value: 'value2'
            }
        ]
    }))
    @Grid()
    static_select: string = undefined;

    @JsonProperty('dynamic_select', User)
    @DynamicFormControl(new SelectFormControl({
        dataService: {service: UserService, params: {role: 'sample_role'}, entity: User},
        hide: {when: {field: 'static_select', value: 'value1'}}
    }))
    @Grid({
        render: function (sample_user: User) {
            if (sample_user) {
                return sample_user.name + ' ' + sample_user.family;
            }
        }
    })
    dynamic_select: User = undefined;

    @Grid({
        render: function (url) {
            if (url) {
                return '<img width="60px" src="' + url + '"/>';
            }
        }
    })
    url: string;

    @DynamicFormControl(new InputFormControl({
        type: 'file', change: function (event) {
            this.value = event.target.files[0];
        }
    }))
    file: File = null;

    @Grid({
        actions: [
            {
                class: 'fa-star',
                routerLink: function (sample: Sample) {
                    return sample.id + '/sub';
                },
                title: 'dashboard.sample.sub.title'
            },
            {type: 'update'},
            {type: 'destroy'}
        ]
    })
    actions: null = undefined;

    init() {
    }
}
