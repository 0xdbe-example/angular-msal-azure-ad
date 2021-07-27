import { MsalGuardConfiguration } from '@azure/msal-angular';
import { InteractionType } from '@azure/msal-browser';

import { environment } from '@environments/environment';

export function MSALGuardConfigFactory(): MsalGuardConfiguration {

    let backends = environment.aad.backends;
    let scopes: string[] = [];

    backends.forEach(function(backend) {
        scopes.push(...backend.scopes)
    });

    return {
      interactionType: InteractionType.Redirect,
      authRequest: {
        scopes: scopes
      },
      loginFailedRoute: '/pages/error403'
  };
}