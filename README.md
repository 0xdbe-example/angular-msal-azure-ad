# Angular Msal with Azure AD


## Configure Azure AD

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

- Assign user to frontend and backend

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

```console
npm run serve
```

## Build

- Build

```console
npm run build
```

- Generate Self-signed certificate

```console
openssl req \
  -x509 \
  -subj "/C=FR/ST=Paris/L=Paris/O=Security/OU=IT Department/CN=www.example.com" \
  -nodes \
  -days 365 \
  -newkey ec:<(openssl ecparam -name prime256v1) \
  -keyout key.pem \
  -out cert.pem
```

- Serve

```console
npx serve \
    --ssl-cert tls/cert.pem \
    --ssl-key tls/key.pem \
    --listen 4200 \
    --single \
    dist/angular-msal-azure-ad-guard
```