provider "azurerm" {
  features {}
}

locals {

  azure_location            = "eastus"
  application_short_name    = "msal4angular"
  application_full_name     = "MSAL for Angular"
  application_environment   = "dev"
  application_homepage      = "https://localhost:4200"
  application_redirect_uris = "${local.application_homepage}/callback"
  backend_api_scope = [
    {
      name = "product:read"
      description = "read all product"
    },
    {
      name = "product:write"
      description = "write all product"
    },
    {
      name = "invoice:write"
      description = "Edit all invoice"
    }
  ]
}

module "azuread_app_backend" {
  source                    = "git::https://github.com/0xdbe-terraform/terraform-azuread-app-backend.git?ref=v1.0.2"
  application_short_name    = local.application_short_name
  application_environment   = local.application_environment
  application_api_scope     = local.backend_api_scope
}

module "azuread_app_frontend" {
  source                    = "git::https://github.com/0xdbe-terraform/terraform-azuread-app-frontend.git?ref=v1.0.0"
  application_short_name    = local.application_short_name
  application_environment   = local.application_environment
  application_homepage      = local.application_homepage
  application_redirect_uris = [local.application_redirect_uris]
  backend_object_id         = module.azuread_app_backend.object_id
  backend_client_id         = module.azuread_app_backend.client_id
  backend_scopes_id         = module.azuread_app_backend.scopes_id
}

module "azure_ressource_group" {
  source                  = "git::https://github.com/0xdbe-terraform/terraform-azure-resource-group.git?ref=v2.0.2"
  azure_location          = local.azure_location
  application_full_name   = local.application_full_name
  application_short_name  = local.application_short_name
  application_environment = local.application_environment
}

module "azure_storage_account_static_webstite" {
  source                  = "git::https://github.com/0xdbe-terraform/terraform-azure-storage-for-static-website.git?ref=v1.0.0"
  azure_location          = local.azure_location
  application_full_name   = local.application_full_name
  application_short_name  = local.application_short_name
  application_environment = local.application_environment
  resource_group_name     = module.azure_ressource_group.name
}
