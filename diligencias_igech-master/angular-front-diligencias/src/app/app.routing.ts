import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './components/layouts/admin-layout/admin-layout.component';

// importamos para la autenticacion de usuarios
// import {AuthGuard} from './components/shared/guards/auth.guard';

const routes: Routes =[

  {
    path: '',
    component: AdminLayoutComponent,
     // para controlar el logueo
    // canActivate:[AuthGuard],

    children: [
        {
      path: '',
      loadChildren: './components/layouts/admin-layout/admin-layout.module#AdminLayoutModule'
  }]}
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
