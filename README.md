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

- Assign user to frontend

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
    }
};
```

## Run

```console
npm run serve
```