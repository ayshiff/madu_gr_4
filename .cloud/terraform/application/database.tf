# Database instance and security group

resource "aws_instance" "database" {
  ami             = var.instance_ami
  instance_type   = var.instance_type
  count           = 1
  key_name        = var.application_key_name

  security_groups = [
    aws_security_group.database_security_group.name
  ]

  tags            = {
    Name      = "${var.stage}_database"
    component = "database"
    stage     = var.stage
    project   = "madu"
  }
}

resource "aws_security_group" "database_security_group" {
  name        = "${var.stage}-madu-database-security-group"
  description = "Allow connection on port 22 and 27017"

  ingress {
    description = "SSH access port"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description     = "TCP database port"
    from_port       = 27017
    to_port         = 27017
    protocol        = "tcp"
    security_groups = [
      aws_security_group.back_end_security_group.id
    ]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
