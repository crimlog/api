locals {
  # THE ORDER OF THESE ENVIRONMENTS IS IMPORTANT
  # each env is mapped (in order) into a subnet CIDR block - see network.tf
  environments = ["dev", "production"]
}

variable "aws_access_key" {
  type = string
}
variable "aws_secret_key" {
  type      = string
  sensitive = true
}
variable "aws_region" {
  type    = string
  default = "us-east-1"
}
variable "image_tag" {
  type    = string
  default = "latest"
}
variable "environment" {
  type    = string
  default = "test"

  # blocked by https://github.com/hashicorp/terraform/issues/25609
  # validation {
  #   condition     = contains(local.environments, var.environment)
  #   error_message = "Environment must be one of ${join(", ", local.environments)}"
  # }
}
