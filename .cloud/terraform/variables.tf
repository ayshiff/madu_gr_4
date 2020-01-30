variable "region" {
  type = string
}

variable amis {
  description = "Default AMIs to use for nodes depending on the region (OS: ubuntu 18.04 LTS)"
  type = map(string)
  default = {
    eu-west-2 = "ami-006a0174c6c25ac06"
    eu-west-3 = "ami-096b8af6e7e8fb927"
    us-west-1 = "ami-03ba3948f6c37a4b0"
    us-west-2 = "ami-0d1cd67c26f5fca19"
    us-east-1 = "ami-07ebfd5b3428b6f4d"
    us-east-2 = "ami-0fc20dd1da406780b"
  }
}

variable "instance_type" {
  type = string
}

variable "ssh_key" {
  type = string
}
