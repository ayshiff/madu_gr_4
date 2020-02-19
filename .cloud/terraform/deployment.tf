provider "aws" {
  profile = "default"
  region = var.region
}

resource "aws_key_pair" "ssh_key" {
  key_name = var.ssh_key
  public_key = file("~/.ssh/${var.ssh_key}.pub")
}

resource "aws_security_group" "ssh_security_group" {
  name = "web_security_group"
  description = "Allow connection on port 22"

  ingress {
    from_port = 22
    to_port = 22
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port = 80
    to_port = 80
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port       = 0
    to_port         = 0
    protocol        = "-1"
    cidr_blocks     = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "serveur_madu" {
  ami = var.amis[var.region]
  instance_type = var.instance_type
  key_name = var.ssh_key
  security_groups = [
    aws_security_group.ssh_security_group.name
  ]
  tags = {
    Name = "serveur_madu"
  }
}