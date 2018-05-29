import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AbstractEntityComponent} from '../../util/abstract-entity-component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ToasterService} from 'angular2-toaster';
import {ActivatedRoute} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {SampleService} from './sample.service';
import {Sample} from '../../entity/sample';

@Component({
    selector: 'app-dashboard-sample',
    templateUrl: './sample.component.html',
    styleUrls: ['./sample.component.css'],
})
export class SampleComponent extends AbstractEntityComponent<Sample> {

    constructor(sampleService: SampleService,
                http: HttpClient,
                modal: NgbModal,
                toastService: ToasterService,
                activeRoute: ActivatedRoute,
                translate: TranslateService) {
        super(Sample, sampleService, http, modal, toastService, activeRoute, translate);
    }
}
