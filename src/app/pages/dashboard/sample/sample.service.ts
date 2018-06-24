import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AbstractEntityService} from '../../../util/abstract-entity.service';
import {Sample} from '../../../entity/sample';

@Injectable({
    providedIn: 'root'
})
export class SampleService extends AbstractEntityService<Sample> {

    route = '/api/sample';

    constructor(http: HttpClient) {
        super(http);
    }
}
