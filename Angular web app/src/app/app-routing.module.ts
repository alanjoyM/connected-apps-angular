import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './admin/about/about.component';
import { LoginPageComponent } from './admin/auth/login-page/login-page.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';

const routes: Routes = [
  {path:"dashboard", component:DashboardComponent},
  {path:"about", component:AboutComponent},
  {path:"login", component: LoginPageComponent},
  {path:"",redirectTo:"login",pathMatch:"full"},
  {path:"**",redirectTo:"login"}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
