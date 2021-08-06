import { IPublicClientApplication,
    PublicClientApplication,
    LogLevel } from '@azure/msal-browser';

import { environment } from '@environments/environment';

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: environment.aad.clientId,
      authority: 'https://login.microsoftonline.com/' + environment.aad.tenantId,
      redirectUri: environment.aad.redirectUri,
      postLogoutRedirectUri: '/',
      navigateToLoginRequestUrl: true
    },
    cache: {
      cacheLocation: 'sessionStorage',
      storeAuthStateInCookie: false,
    },
    system: {
      loggerOptions: {
        logLevel: LogLevel.Info,
        piiLoggingEnabled: false
      }
    }
  });
}