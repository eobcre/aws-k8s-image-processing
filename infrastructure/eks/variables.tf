variable "aws_region" {
  description = "AWS region"
  type        = string
}

variable "cluster_name" {
  description = "EKS cluster name"
  type        = string
}

variable "tf_state_bucket" {
  type = string
}

variable "vpc_state_key" {
  type = string
}