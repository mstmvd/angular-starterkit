import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AbstractEntityComponent} from '../../../util/abstract-entity.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ToasterService} from 'angular2-toaster';
import {ActivatedRoute} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {SampleService} from './sample.service';
import {Sample} from '../../../entity/sample';
import {Auth} from '../../../auth-guard.service';

@Component({
    selector: 'app-dashboard-sample',
    templateUrl: '../../../util/abstract-entity.component.html',
    styleUrls: ['./sample.component.css'],
})

@Auth({roles: ['admin']})
export class SampleComponent extends AbstractEntityComponent<Sample> {
    title = 'dashboard.location.title'; // key from language file
    constructor(sampleService: SampleService,
                http: HttpClient,
                modal: NgbModal,
                toastService: ToasterService,
                activeRoute: ActivatedRoute,
                translate: TranslateService) {
        super(Sample, sampleService, http, modal, toastService, activeRoute, translate);
    }
}
