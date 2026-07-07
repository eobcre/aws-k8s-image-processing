output "certificate_arn" {
  value = aws_acm_certificate.api.arn
}

output "certificate_status" {
  value = aws_acm_certificate_validation.api.id
}