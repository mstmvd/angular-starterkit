import {Component, Output} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AbstractEntityComponent} from '../../../../util/abstract-entity.component';
import {HttpClient} from '@angular/common/http';
import {ToasterService} from 'angular2-toaster';
import {ActivatedRoute} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {SubSample} from '../../../../entity/sub-sample';
import {SampleSubService} from './sample-sub.service';
import {Auth} from '../../../../auth-guard.service';

@Component({
    selector: 'app-sample-sub',
    templateUrl: '../../../../util/abstract-entity.component.html',
})
@Output()
@Auth({roles: ['admin']})
export class SampleSubComponent extends AbstractEntityComponent<SubSample> {
    modalHeader = 'Sub Sample';

    constructor(private subSampleService: SampleSubService,
                httpClient: HttpClient,
                modal: NgbModal,
                toastService: ToasterService,
                activeRoute: ActivatedRoute,
                translate: TranslateService) {
        super(SubSample, subSampleService, httpClient, modal, toastService, activeRoute, translate);
    }
}
