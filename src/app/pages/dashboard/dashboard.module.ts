import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard.component';
import {NbCardModule, NbLayoutModule, NbMenuModule, NbSidebarModule, NbSidebarService, NbUserModule} from '@nebular/theme';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToasterModule, ToasterService} from 'angular2-toaster';
import {TranslateModule} from '@ngx-translate/core';
import {DataTablesModule} from 'angular-datatables';
import {RouterModule} from '@angular/router';
import {SampleSubComponent} from './sample/sub/sample-sub.component';
import {SampleComponent} from './sample/sample.component';
import {SampleSubService} from './sample/sub/sample-sub.service';
import {SampleService} from './sample/sample.service';
import {GridComponent} from '../../util/grid.component';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
        NbLayoutModule,
        NbSidebarModule,
        NbMenuModule.forRoot(),
        NbUserModule,
        FormsModule,
        ReactiveFormsModule,
        ToasterModule,
        TranslateModule,
        DataTablesModule,
        RouterModule,
        NbCardModule,
    ],
    declarations: [
        GridComponent, DashboardComponent, SampleComponent, SampleSubComponent
    ],
    providers: [NgbActiveModal, NbSidebarService, ToasterService, SampleService, SampleSubService]
})
export class DashboardModule {
}
