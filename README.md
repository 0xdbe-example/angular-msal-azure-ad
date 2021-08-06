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