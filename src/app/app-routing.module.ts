import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './auth-guard.service';

const routes: Routes = [
    {path: 'dashboard', loadChildren: './pages/dashboard/dashboard.module#DashboardModule', canActivate: [AuthGuard]},
    {path: 'auth', loadChildren: './pages/auth/auth.module#AuthModule'},
    {path: '', loadChildren: './pages/home/home.module#HomeModule'},
    {path: '**', redirectTo: '/'},
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forRoot(routes)],
})

export class AppRoutingModule {
}
