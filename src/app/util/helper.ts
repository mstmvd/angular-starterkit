import {Toast, ToasterService} from 'angular2-toaster';
import {JsonConvert, ValueCheckingMode} from 'json2typescript';

export class Helper {
    constructor() {
    }

    static parse_jwt(token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }

    static showToast(toasterService: ToasterService, type: string, title: string, body: string) {

        const toast: Toast = {
            type: type,
            title: title,
            body: body,
        };
        toasterService.popAsync(toast);
    }

    static convertToEntities(data, entityType) {
        const entities = [];
        const jsonConvert: JsonConvert = new JsonConvert();
        jsonConvert.valueCheckingMode = ValueCheckingMode.ALLOW_NULL;
        data.forEach(function (v) {
            const entity = jsonConvert.deserialize(v, entityType);
            entity.init();
            entities.push(entity);
        });
        return entities;
    }

    static equals(a, b) {
        if (a && b) {
            if (typeof a === typeof b && typeof a === 'object') {
                return a.id === b.id;
            } else {
                return a === b;
            }
        }
        return false;
    }
}
