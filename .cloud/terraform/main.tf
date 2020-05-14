provider "aws" {
  version = "~> 2.0"
  region = var.region
}

data "aws_ami" "ubuntu" {
  most_recent = true

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-bionic-18.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }

  owners = ["099720109477"] # Canonical
}

resource "aws_key_pair" "ssh-key" {
  public_key = file(var.public_ssh_key_file)
  key_name   = "madu_ssh_key"
}

module "production" {
  source                  = "./application"

  instance_ami            = data.aws_ami.ubuntu.id
  application_key_name    = aws_key_pair.ssh-key.key_name
  client_instance_count   = 1
  back_end_instance_count = 1
  stage                   = "production"
}