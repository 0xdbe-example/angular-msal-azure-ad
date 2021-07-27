import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { AuthService } from './services/auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'angular-msal-azure-ad-guard';
  authenticationPending = true;
  private readonly _destroying$ = new Subject<void>();

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {

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

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}
