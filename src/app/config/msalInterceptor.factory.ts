import { InteractionType } from '@azure/msal-browser';
import { MsalInterceptorConfiguration } from '@azure/msal-angular';

import { environment } from '@environments/environment';

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
    const protectedResourceMap = new Map<string, Array<string>>();
    let backends = environment.aad.backends;
    backends.forEach(function(backend) {
        protectedResourceMap.set(backend.uri, backend.scopes);
    });
    return {
      interactionType: InteractionType.Redirect,
      protectedResourceMap
    };
}