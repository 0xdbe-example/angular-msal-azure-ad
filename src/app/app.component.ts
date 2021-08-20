import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private meta: Meta) {
    this.meta.addTags([
      {
        'http-equiv': "Content-Security-Policy",
        'content': environment.contentSecurityPolicy
      }
    ]);
   }

}
