variable "region" {
  type = string
  default = "eu-west-2"
}

variable "public_ssh_key_file" {
  type = string
  description = "Path to public SSH key file to use for AWS Instances (need an RSA key for Circleci, not OpenSSH)"
}
