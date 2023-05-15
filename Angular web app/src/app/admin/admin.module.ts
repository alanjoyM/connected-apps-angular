import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AboutComponent } from './about/about.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { MaterialModule } from '../material.module';
import { DashboardService } from '../common-ui-services/dashboard.service';
import { AddProjectComponent } from './add-project/add-project.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { httpInterceptProviders } from '../common-ui-services/http-interceptors';
import { LoginPageComponent } from './auth/login-page/login-page.component';
import { ResponsiveGridModule } from './common-ui-helpers/responsive-grid/responsive-grid.module';




@NgModule({
  declarations: [
    DashboardComponent,
    AboutComponent,
    MyProfileComponent,
    AddProjectComponent,
    LoginPageComponent,

  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    ResponsiveGridModule
  ],
  exports:[
    DashboardComponent,
    AboutComponent,
    MyProfileComponent,
    LoginPageComponent
  ],
  providers:[
    DashboardService, httpInterceptProviders
  ]
})
export class AdminModule { }
