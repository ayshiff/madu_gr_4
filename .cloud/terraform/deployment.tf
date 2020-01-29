provider "aws" {
  profile = "default"
  region = var.region
}

resource "aws_key_pair" "ssh_key" {
  key_name = var.ssh_key
  public_key = file("~/.ssh/${var.ssh_key}.pub")
}

resource "aws_security_group" "ssh_security_group" {
  name = "ssh_security_group"
  description = "Allow connection on port 22"

  ingress {
    from_port = 22
    to_port = 22
    protocol = "tcp"
  }

  egress {
    from_port       = 0
    to_port         = 0
    protocol        = "-1"
    cidr_blocks     = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "serveur_madu" {
  ami = var.ami
  instance_type = var.instance_type
  key_name = var.ssh_key
  security_groups = [
    "ssh_security_group"
  ]
  tags = {
    Name = "serveur_madu"
  }
}