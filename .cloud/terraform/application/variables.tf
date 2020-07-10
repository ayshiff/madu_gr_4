variable "instance_type" {
  type        = string
  default     = "t2.micro"
  description = "Type of instance"
}

variable "instance_ami" {
  type        = string
  description = "Define the AMI (OS) of instance"
}

variable "client_instance_count" {
  type        = number
  default     = 1
  description = "Number of client instances"
}

variable "back_end_instance_count" {
  type        = number
  default     = 1
  description = "Number of back-end instances"
}

variable "application_key_name" {
  type        = string
  description = "Key name for SSH access on the instance"
}

variable "stage" {
  type        = string
  description = "Stage which application is deployed"
}
