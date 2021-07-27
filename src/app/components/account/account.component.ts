import { Component, OnInit } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { AccountInfo } from '@azure/msal-browser';

import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  userData: AccountInfo | null = null;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.userData = this.authService.userData;
  }

}
