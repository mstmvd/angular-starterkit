import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from './auth.interceptor';
import {AuthGuard} from './auth-guard.service';
import {NbLayoutDirection, NbThemeModule} from '@nebular/theme';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DataTablesModule} from 'angular-datatables';
import {ToasterModule, ToasterService} from 'angular2-toaster';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {NgHttpLoaderModule} from 'ng-http-loader';
import {DynamicFormControlComponent} from './util/dynamic-form/dynamic-form-control.component';
import {DynamicModalFormComponent} from './util/dynamic-form/dynamic-modal-form.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

@NgModule({
    declarations: [
        AppComponent,
        DynamicFormControlComponent,
        DynamicModalFormComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        NgbModule.forRoot(),
        NbThemeModule.forRoot({name: 'default'}, [], [], NbLayoutDirection.RTL),
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DataTablesModule,
        ToasterModule,
        NoopAnimationsModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        NgHttpLoaderModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
        AuthGuard,
        ToasterService
    ],
    bootstrap: [AppComponent],
    entryComponents: [DynamicModalFormComponent]

})
export class AppModule {
}
