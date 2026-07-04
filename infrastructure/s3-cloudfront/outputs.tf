output "cloudfront_distribution_id" {
  description = "CloudFront distribution ID"
  value       = aws_cloudfront_distribution.project.id
}

output "cloudfront_domain_name" {
  description = "CloudFront distribution domain name"
  value       = aws_cloudfront_distribution.project.domain_name
}

output "website_url" {
  description = "Website URL"
  value       = "https://${var.domain_name}"
}

output "main_bucket_name" {
  description = "S3 bucket name for frontend hosting"
  value       = aws_s3_bucket.project.bucket
}

output "main_bucket_arn" {
  description = "S3 bucket ARN for frontend hosting"
  value       = aws_s3_bucket.project.arn
}

output "uploads_bucket_name" {
  description = "S3 bucket name for uploads"
  value       = aws_s3_bucket.uploads.bucket
}

output "uploads_bucket_arn" {
  description = "S3 bucket ARN for uploads"
  value       = aws_s3_bucket.uploads.arn
}

output "acm_certificate_arn" {
  description = "ACM certificate ARN used by CloudFront"
  value       = data.aws_acm_certificate.project.arn
}