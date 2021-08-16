import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';

import {
  MsalGuard,
  MsalInterceptor,
  MsalModule,
  MsalRedirectComponent,
  MsalService,
  MSAL_GUARD_CONFIG,
  MSAL_INSTANCE,
  MSAL_INTERCEPTOR_CONFIG } from '@azure/msal-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MSALInstanceFactory } from './config/msalInstance.factory'
import { MSALGuardConfigFactory } from './config/msalGuard.factory'
import { MSALInterceptorConfigFactory } from './config/msalInterceptor.factory';
import { HomeComponent } from './components/home/home.component';
import { PublicComponent } from './layouts/public/public.component';
import { PrivateComponent } from './layouts/private/private.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './layouts/header/header.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { AccountComponent } from './components/account/account.component';
import { CallbackComponent } from './components/callback/callback.component';
import { ProductInterceptor } from './backend/product.interceptor';
import { ProductComponent } from './component/product/product.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PublicComponent,
    PrivateComponent,
    LoginComponent,
    HeaderComponent,
    UnauthorizedComponent,
    AccountComponent,
    CallbackComponent,
    ProductComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FlexLayoutModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MsalModule
  ],
  providers: [
    MsalGuard,
    MsalService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ProductInterceptor,
      multi: true
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory
    }
  ],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }
