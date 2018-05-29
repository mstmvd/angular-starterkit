import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard.component';
import {NbLayoutModule, NbMenuModule, NbSidebarModule, NbSidebarService, NbUserModule} from '@nebular/theme';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToasterModule, ToasterService} from 'angular2-toaster';
import {TranslateModule} from '@ngx-translate/core';
import {SampleModule} from './sample/sample.module';

@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
        SampleModule,
        NbLayoutModule,
        NbSidebarModule,
        NbMenuModule.forRoot(),
        NbUserModule,
        FormsModule,
        ReactiveFormsModule,
        ToasterModule,
        TranslateModule
    ],
    declarations: [
        DashboardComponent,
    ],
    providers: [NbSidebarService, ToasterService], // we need this service for the sidebar
})
export class DashboardModule {
}
