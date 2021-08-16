import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';

import { environment } from '@environments/environment';
import { PublicComponent } from './layouts/public/public.component'
import { PrivateComponent } from './layouts/private/private.component'
import { AccountComponent } from './components/account/account.component'
import { CallbackComponent } from './components/callback/callback.component'
import { HomeComponent } from './components/home/home.component'
import { LoginComponent } from './components/login/login.component'
import { ProductComponent } from './component/product/product.component'
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component'

const routes: Routes = [
  {
    path: '',
    component: PublicComponent,
    children: [
      { path: '', component: LoginComponent, pathMatch: 'full'},
      { path: 'login', component: LoginComponent },
      { path: 'unauthorized', component: UnauthorizedComponent},
      { path: 'callback', component: CallbackComponent }
    ]
  },
  {
    path: '',
    component: PrivateComponent,
    children: [
      { path: 'account', component: AccountComponent },
      { path: 'home', component: HomeComponent },
      { path: 'product', component: ProductComponent }
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
