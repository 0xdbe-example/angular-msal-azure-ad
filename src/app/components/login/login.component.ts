import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  authenticationPending = true;
  private readonly _destroying$ = new Subject<void>();

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {

    // Redirect auhenticated user to home
    this.authService.redirectAuhenticatedUserToHome();

  // Update authentication process status
  this.authService.authenticationPending
  .pipe(
    filter((state: boolean) => state === false),
    takeUntil(this._destroying$)
  )
  .subscribe({
    next: (state) => {
      this.authenticationPending = state;
    }
  })

  }

  login(): void {
    this.authService.login()
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }

}
