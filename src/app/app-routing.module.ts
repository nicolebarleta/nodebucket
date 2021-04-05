/*
 ============================================
; Title:  app-routing.module.ts
; Author: Professor Krasso
; Date: 21 March 2021
; Modified By: Marie Nicole Barleta
; Description: app-routing module ts file
;===========================================
 */

//import statements
import { HomeComponent } from './pages/home/home.component';
import { BaseLayoutComponent } from './shared/base-layout/base-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './shared/auth.guard';
import { AboutComponent } from './pages/about/about.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
//declaration of routes
const routes: Routes = [
  {
    //the parent path
    path: '',
    component: BaseLayoutComponent,
    //the path inside the parent path
    children: [
      {
        path: '',
        component: HomeComponent,
        /**
         * the authentication guard before the user can enter the parent path,
         * canActivate will allow the parent and child once its authenticated
         */
        canActivate: [AuthGuard]
      },
      {
        path: 'about',
        component: AboutComponent
      }
    ]
  },
  //the declaration of /session/login connected to the AuthGuard
  {
    path: 'session',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'not-found',
        component: NotFoundComponent
      },
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  },
  {
  path: '**',
  redirectTo: 'session/not-found'
  },
];
//NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, enableTracing: false, scrollPositionRestoration: 'enabled', relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
//export statement of app routing module
export class AppRoutingModule { }
