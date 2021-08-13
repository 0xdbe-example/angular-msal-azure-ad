import { Component, OnInit } from '@angular/core';
import { environment } from '@environments/environment';
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.scss']
})
export class UnauthorizedComponent implements OnInit {

  error: null | string = null;
  debug: boolean = environment.debug.msal;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.error = this.authService.error ? this.authService.error.message : null
  }

}
