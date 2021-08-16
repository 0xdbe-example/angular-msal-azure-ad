import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService, MsalBroadcastService } from '@azure/msal-angular';
import { AccountInfo, AuthenticationResult, EventMessage, EventType, EventError, InteractionStatus } from '@azure/msal-browser';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authenticated = new BehaviorSubject(false);
  authenticationPending = new BehaviorSubject(true);
  userData: AccountInfo | null = null;
  error: EventError = null;

  constructor(
    private msalBroadcastService: MsalBroadcastService,
    private msalService: MsalService,
    private router: Router,
  ) {
    // Load current authentication state
    this.authenticationInit();
    // Authentication Progress
    this.msalBroadcastService.inProgress$.subscribe({
      next: (status: InteractionStatus) => {
        if (environment.debug.msal) {
          console.log(`MSAL Interaction Status: ${status}`);
        }
        if (status === InteractionStatus.None) {
          this.authenticationPending.next(false);
        } else {
          this.authenticationPending.next(true);
        }
      }
    });

    // Launch action on event from MSAL service
    this.msalBroadcastService.msalSubject$.subscribe({
      next: (event: EventMessage) => {
        if (environment.debug.msal) {
          console.log(`MSAL Event Type: ${event.eventType}`);
        }
        switch(event.eventType) {
          case EventType.LOGIN_SUCCESS: case EventType.ACQUIRE_TOKEN_SUCCESS: {
            console.log("LOGIN_SUCCESS");
            let payload = event.payload as AuthenticationResult
            this.eventLogin(payload.account);
            break;
          }
          case EventType.LOGOUT_SUCCESS: {
            console.log("logout")
            this.eventLogout();
            break;
          }
          case EventType.LOGIN_FAILURE : case EventType.ACQUIRE_TOKEN_FAILURE: {
            this.eventLoginFailure(event.error);
            break;
          }
          default: {
            break;
          }
        }
      }
    });
  }

  eventLogin(account: AccountInfo | null) {
    if (account) {
      // Active user account
      this.msalService.instance.setActiveAccount(account);
      this.userData = this.msalService.instance.getActiveAccount()
      // change authentication state
      this.authenticated.next(this.msalService.instance.getActiveAccount() ? true : false)
    }
  }

  eventLogout() {
    this.authenticated.next(false);
    this.userData = null;
    this.router.navigate(['/']);
  }

  eventLoginFailure(error : any) {
    this.authenticated.next(false);
    this.userData = null;
    this.error = error;
    this.router.navigate(['/unauthorized']);
  }

  authenticationInit() {
    if (!this.msalService.instance.getActiveAccount() || this.msalService.instance.getAllAccounts.length > 0) {
      // Enable the first existing account
      let accounts = this.msalService.instance.getAllAccounts()
      this.eventLogin(accounts[0]);
    }
  }

  login() {
    let backends = environment.aad.backends;
    let scopes: string[] = [];
    backends.forEach(function(backend) {
      scopes.push(...backend.scopes)
    });
    this.msalService.loginRedirect({
      redirectUri: environment.aad.redirectUri,
      scopes: scopes
    });
  }

  logout() {
    // logout without SLO
    this.msalService.instance.logoutRedirect({
      onRedirectNavigate: (url) => { return false;}
    });
  }

  redirectAuhenticatedUserToHome() {
    // Redirect user if is already authenticated
    this.authenticationPending
    .pipe(
      filter((state: boolean) => state === false),
    )
    .subscribe({
      next: (state) => {
        console.log(this.authenticationPending)
        if (this.authenticated.getValue()) {
          this.router.navigate(['/home']);
        }
      }
    })
  }

}