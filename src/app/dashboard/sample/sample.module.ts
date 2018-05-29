import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DataTablesModule} from 'angular-datatables';
import {RouterModule} from '@angular/router';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {NbCardModule} from '@nebular/theme';
import {TranslateModule} from '@ngx-translate/core';
import {SampleComponent} from './sample.component';
import {SampleService} from './sample.service';
import {SubSampleComponent} from './sub-sample/sub-sample.component';
import {SubSampleService} from './sub-sample/sub-sample.service';

@NgModule({
    imports: [
        CommonModule,
        DataTablesModule,
        RouterModule,
        NbCardModule,
        TranslateModule
    ],
    declarations: [SampleComponent, SubSampleComponent],
    providers: [SampleService, SubSampleService, NgbActiveModal],

})
export class SampleModule {
}
