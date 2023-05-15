import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module'
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminModule } from './admin/admin.module';
import {HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { SnackbarComponent } from './common-ui-comp/snackbar/snackbar.component';
import { SpinnerComponent } from './common-ui-comp/spinner/spinner.component';
import { httpInterceptProviders } from './common-ui-services/http-interceptors';




@NgModule({
  declarations: [
    AppComponent,
    SnackbarComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    AdminModule,
    HttpClientModule,
    ReactiveFormsModule,


  ],
  exports:[MaterialModule],
  providers: [httpInterceptProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
