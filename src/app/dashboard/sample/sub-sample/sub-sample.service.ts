import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AbstractEntityService} from '../../../util/abstract-entity-service';
import {SubSample} from '../../../entity/sub-sample';

@Injectable({
    providedIn: 'root'
})
export class SubSampleService extends AbstractEntityService<SubSample> {

    route = `/api/sample/{sample_id}/sub`;

    constructor(http: HttpClient) {
        super(http);
    }
}
