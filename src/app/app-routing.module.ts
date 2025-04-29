// src/app/app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizedGuard } from './auth/guards/authorized.guard';
import { NotAuthorizedGuard } from './auth/guards/not-authorized.guard';
import { AdminGuard } from './user/guards/admin.guard';

const routes: Routes = [
    {
        path: 'login',
        loadChildren: () => import('./auth/pages/login/login.module').then(m => m.LoginModule),
        canActivate: [NotAuthorizedGuard]
    },
    {
        path: 'registration',
        loadChildren: () => import('./auth/pages/registration/registration.module').then(m => m.RegistrationModule),
        canActivate: [NotAuthorizedGuard]
    },
    {
        path: 'courses',
        loadChildren: () => import('./courses/courses.module').then(m => m.CoursesModule),
        canLoad: [AuthorizedGuard]
    },
    { path: '', redirectTo: '/courses', pathMatch: 'full' },
    { path: '**', redirectTo: '/courses' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
