import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  private readonly _destroying$ = new Subject<void>();

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.redirectAuhenticatedUserToHome();
  }

  login(){
    this.authService.login()
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }

}
