import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {SampleComponent} from './sample/sample.component';
import {SampleSubComponent} from './sample/sub/sample-sub.component';
import {AuthGuard} from '../../auth-guard.service';

const routes: Routes = [

    {
        path: '', component: DashboardComponent, children: [
            {path: 'sample', component: SampleComponent, canActivate: [AuthGuard]},
            {path: 'sample/:sample_id/sub', component: SampleSubComponent, canActivate: [AuthGuard]},
        ]
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    providers: [AuthGuard, SampleComponent, SampleSubComponent],
    exports: [RouterModule]
})
export class DashboardRoutingModule {
}
