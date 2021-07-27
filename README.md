# Angular Msal with Azure AD

## Configure

Complete environment file:

```typescript
export const environment = {
    production: false,
    debug: {
        msal: true,
        router: true,
    },
    aad: {
        clientId: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
        tenantId: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
        redirectUri: '/callback',
        backends: [
            {
                uri: 'https://localhost:3000',
                scopes: ['api://helloworld.com/user_impersonation']
            }
        ]
    }
};
```

## Run

```console
npm run serve
```