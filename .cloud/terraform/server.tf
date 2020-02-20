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
