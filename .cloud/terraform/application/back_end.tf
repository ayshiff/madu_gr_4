# Back-end instance, security group and elb

resource "aws_instance" "back_end" {
  ami             = var.instance_ami
  instance_type   = var.instance_type
  count           = var.back_end_instance_count
  key_name        = var.application_key_name

  security_groups = [
    aws_security_group.back_end_security_group.name
  ]

  tags            = {
    Name      = "${var.stage}_back_end"
    component = "back_end"
    stage     = var.stage
    project   = "madu"
  }
}

resource "aws_security_group" "back_end_security_group" {
  name        = "${var.stage}-madu-back-end-security-group"
  description = "Allow connection on port 22 and 3000 for back-end"

  ingress {
    description = "SSH access port"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "HTTP back-end port"
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port       = 0
    to_port         = 0
    protocol        = "-1"
    cidr_blocks     = ["0.0.0.0/0"]
  }
}

resource "aws_elb" "back_end_elb" {
  name               = "${var.stage}-madu-back-end-elb"
  availability_zones = ["eu-west-2a", "eu-west-2b", "eu-west-2c"]

  listener {
    instance_port     = 3000
    instance_protocol = "http"
    lb_port           = 80
    lb_protocol       = "http"
  }

  health_check {
    healthy_threshold   = 2
    interval            = 30
    target              = "HTTP:3000/"
    timeout             = 3
    unhealthy_threshold = 2
  }

  instances                   = aws_instance.back_end.*.id
  cross_zone_load_balancing   = true
  idle_timeout                = 400
  connection_draining         = true
  connection_draining_timeout = 400

  tags = {
    Name = "${var.stage}_madu_back_end_elb"
  }
}
