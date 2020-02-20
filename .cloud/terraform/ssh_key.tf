resource "aws_key_pair" "ssh_key" {
  key_name = var.ssh_key
  public_key = file("~/.ssh/${var.ssh_key}.pub")
}
