import { MsalGuardConfiguration } from '@azure/msal-angular';
import { InteractionType } from '@azure/msal-browser';

import { environment } from '@environments/environment';

export function MSALGuardConfigFactory(): MsalGuardConfiguration {

    // Build list of scopes
    const scopes: string[] = environment.aad.backends.reduce<string[]>(
      (prevScopes, item) => [...prevScopes, ...item.scopes],
      []
    );

    return {
      interactionType: InteractionType.Redirect,
      authRequest: {
        scopes: scopes
      },
      loginFailedRoute: '/unauthorized'
  };
}
