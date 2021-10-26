import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { environment } from '@environments/environment';
import { MsalBroadcastService } from '@azure/msal-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private meta: Meta,
    // msalBroadcastService is needed to fix issue:
    // https://github.com/AzureAD/microsoft-authentication-library-for-js/issues/4176
    private msalBroadcastService: MsalBroadcastService,
    ) {
    this.meta.addTags([
      {
        'http-equiv': "Content-Security-Policy",
        'content': environment.contentSecurityPolicy
      }
    ]);
   }

}
