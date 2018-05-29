import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeRoutingModule} from './home-routing.module';
import {IndexComponent} from './index/index.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HomeService} from './home.service';

@NgModule({
    imports: [
        CommonModule,
        HomeRoutingModule,
        ReactiveFormsModule,
    ],
    declarations: [
        IndexComponent
    ],
    providers: [
        HomeService
    ]
})
export class HomeModule {
}
