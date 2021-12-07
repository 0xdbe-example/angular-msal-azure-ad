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
  currentUser = new BehaviorSubject<AccountInfo | null>(null);
  error: EventError = null;

  constructor(
    private msalBroadcastService: MsalBroadcastService,
    private msalService: MsalService,
    private router: Router,
  ) {
    // Init Service
    this.activeFirstAccoutFromSessionStorage();
    this.loadActiveAccount();

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
      },
      error: (error) => {
        console.log('error: ', error);
      },
      complete: () => {
        console.log('complete');
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
            this.onLogin(payload.account);
            break;
          }
          case EventType.LOGOUT_SUCCESS: {
            console.log("logout")
            this.onLogout();
            break;
          }
          case EventType.LOGIN_FAILURE : case EventType.ACQUIRE_TOKEN_FAILURE: {
            this.onLoginFailure(event.error);
            break;
          }
          default: {
            break;
          }
        }
      }
    });
  }

  onLogin(account: AccountInfo | null) {
    if (account) {
      // Active user account
      this.msalService.instance.setActiveAccount(account);
      // Load account
      this.loadActiveAccount();
    }
  }

  onLogout() {
    this.authenticated.next(false);
    this.currentUser.next(null);
    this.router.navigate(['/']);
  }

  onLoginFailure(error : any) {
    this.authenticated.next(false);
    this.currentUser.next(null);
    this.error = error;
    this.router.navigate(['/unauthorized']);
  }

  activeFirstAccoutFromSessionStorage(){
    let account = this.msalService.instance.getAllAccounts()[0]
    if (account) {
      this.msalService.instance.setActiveAccount(account);
    }
  }

  loadActiveAccount() {
    if (this.msalService.instance.getActiveAccount()){
      var activeAccount = this.msalService.instance.getActiveAccount();
      this.currentUser.next(activeAccount)
      this.authenticated.next(activeAccount ? true : false);
    }
  }

  login() {
    // Build list of scopes
    const scopes: string[] = environment.aad.backends.reduce<string[]>(
      (prevScopes, item) => [...prevScopes, ...item.scopes],
      []
    );
    this.msalService.loginRedirect({
      redirectUri: environment.aad.redirectUri,
      scopes: scopes,
      prompt: 'select_account'
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