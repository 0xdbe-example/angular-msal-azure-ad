import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsalGuard, MsalRedirectComponent } from '@azure/msal-angular';

import { environment } from '@environments/environment';

import { PublicComponent } from './layouts/public/public.component'
import { PrivateComponent } from './layouts/private/private.component'

import { AccountComponent } from './components/account/account.component'
import { HomeComponent } from './components/home/home.component'
import { LoginComponent } from './pages/login/login.component'
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component'

const routes: Routes = [
  {
    path: 'callback',
    component: MsalRedirectComponent,
  },
  {
    path: '',
    component: PublicComponent,
    children: [
      {
        path: '',
        component: LoginComponent,
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'unauthorized',
        component: UnauthorizedComponent
      }
    ]
  },
  {
    path: '',
    component: PrivateComponent,
    children: [
      {
        path: 'account',
        component: AccountComponent,

      },
      {
        path: 'home',
        component: HomeComponent,

      }
    ],
    canActivate: [ MsalGuard ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    //useHash: true,
    enableTracing: environment.debug.router
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
