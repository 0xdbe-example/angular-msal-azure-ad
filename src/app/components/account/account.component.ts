import { Component, OnInit, OnDestroy } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { AccountInfo } from '@azure/msal-browser';

import { AuthService } from '../../services/auth.service'
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit, OnDestroy {

  user: AccountInfo | null = null;
  private readonly _destroying$ = new Subject<void>();

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.currentUser
    .pipe(
      takeUntil(this._destroying$)
    )
    .subscribe({
      next: (currentUser) => {
        this.user = currentUser;
      }
    })
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}
