# Angular Msal with Azure AD


## Create Azure ressources

- Init Terraform

```
cd terraform
terraform init
```

- Import App Registration and Service principal if already exist

```
terraform import module.azuread_app_frontend.azuread_application.main <OBJECT_ID>
terraform import module.azuread_app_frontend.azuread_service_principal.main <OBJECT_ID>
terraform import module.azuread_app_backend.azuread_application.main <OBJECT_ID>
```

- Deploy

```
terraform apply
```

- Assign users to frontend and backend


## Configure MSAL

Complete environment file for testing purpose:

```typescript
export const environment = {
    production: false,
    fakeBackend: true,
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
                scopes: ['api://msal4angular-dev/product:write', 'api://msal4angular-dev/product:read']
            },
        ]
    },
    contentSecurityPolicy:
        "default-src 'none'; " +
        "font-src https://fonts.gstatic.com; " +
        "img-src 'self'; " +
        "script-src 'self'; " +
        "script-src-elem 'self'; " +
        "style-src 'self' 'unsafe-inline';" +
        "style-src-elem 'self' 'unsafe-inline'; " +
        "connect-src 'self' https://localhost:3000 https://login.microsoftonline.com; "
};
```

## Run

- Generate local certificate (using [mkcert](https://0xdbe.github.io/AngularSecurity-ServeApplicationLocallyOverHttps/))

```console
npm run cert
```

- Run locally

```console
npm run serve
```

## Depoly

- Build

```console
npm run build
```

- Deploy

```console
az storage blob upload-batch \
    --source 'dist/angular-msal-azure-ad-guard' \
    --destination '$web'  \
    --account-name <ACCOUNT_NAME>
```
