import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {SampleComponent} from './sample/sample.component';
import {SampleSubComponent} from './sample/sub/sample-sub.component';

const routes: Routes = [

    {
        path: '', component: DashboardComponent, children: [
            {path: 'sample', component: SampleComponent},
            {path: 'sample/:sample_id/sub', component: SampleSubComponent},
        ]
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule {
}
