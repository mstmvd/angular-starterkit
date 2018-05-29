import {Component, Output} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AbstractEntityComponent} from '../../../util/abstract-entity-component';
import {HttpClient} from '@angular/common/http';
import {ToasterService} from 'angular2-toaster';
import {ActivatedRoute} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {SubSample} from '../../../entity/sub-sample';
import {SubSampleService} from './sub-sample.service';

@Component({
    selector: 'app-sample-sub',
    template: `
        <nb-card>
            <nb-card-header [translate]="'dashboard.sample.sub.title'">
            </nb-card-header>
            <nb-card-body>
                <button type="button" class="btn btn-primary" (click)="this.store()">New</button>
                <table datatable [dtOptions]="this.dtOptions" [dtTrigger]="this.dtTrigger" class="row-border hover" width="100%">
                    <thead>
                    <tr>
                        <td>Title</td>
                        <td>Description</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr *ngFor="let sub_sample of entities">
                        <td>{{sub_sample.title}}</td>
                        <td>{{sub_sample.description}}</td>
                        <td>
                            <button class="grid-btn btn btn-warning" (click)="this.update(sub_sample)">Edit</button>
                            <button class="grid-btn btn btn-danger" (click)="this.destroy(sub_sample)">Delete</button>
                        </td>
                    </tr>
                    <tr *ngIf="this.entities?.length == 0">
                        <td colspan="3" class="no-data-available">No data!</td>
                    </tr>
                    </tbody>
                </table>
            </nb-card-body>
        </nb-card>
    `,
})
@Output()

export class SubSampleComponent extends AbstractEntityComponent<SubSample> {
    modalHeader = 'Sub Sample';

    constructor(private subSampleService: SubSampleService,
                httpClient: HttpClient,
                modal: NgbModal,
                toastService: ToasterService,
                activeRoute: ActivatedRoute,
                translate: TranslateService) {
        super(SubSample, subSampleService, httpClient, modal, toastService, activeRoute, translate);
    }
}
