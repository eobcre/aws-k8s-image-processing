terraform {
  backend "s3" {}

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

#################################
# Data Sources
#################################

# existing acm
data "aws_acm_certificate" "project" {
  domain      = var.domain_name
  statuses    = ["ISSUED"]
  most_recent = true
}

#################################
# S3 Bucket
#################################

resource "aws_s3_bucket" "project" {
  bucket = var.main_bucket_name
}

resource "aws_s3_bucket" "uploads" {
  bucket = var.bucket_name
}

#################################
# CloudFront - OAC
#################################

resource "aws_cloudfront_origin_access_control" "project_oac" {
  name                              = "project-oac"
  description                       = "OAC for project S3 bucket"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

#################################
# CloudFront Distribution
#################################

resource "aws_cloudfront_distribution" "project" {
  enabled             = true
  default_root_object = "index.html"
  comment             = "for caption studio project"
  price_class         = "PriceClass_100"

  /////////////////////////////////
  # Origin
  ////////////////////////////////

  origin {
    domain_name              = aws_s3_bucket.project.bucket_regional_domain_name
    origin_id                = "S3-Origin"
    origin_access_control_id = aws_cloudfront_origin_access_control.project_oac.id
  }

  /////////////////////////////////
  # Cache Behaviors
  ////////////////////////////////

  default_cache_behavior {
    target_origin_id       = "S3-Origin"
    viewer_protocol_policy = "redirect-to-https"

    allowed_methods = ["GET", "HEAD"]
    cached_methods  = ["GET", "HEAD"]

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }
  }

  /////////////////////////////////
  # Error Pages
  ////////////////////////////////

  custom_error_response {
    error_code         = 403
    response_code      = 200
    response_page_path = "/index.html"
  }

  custom_error_response {
    error_code         = 404
    response_code      = 200
    response_page_path = "/index.html"
  }

  /////////////////////////////////
  # Restrictions
  ////////////////////////////////

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  /////////////////////////////////
  # SSL Certificate
  ////////////////////////////////

  aliases = [var.domain_name]

  viewer_certificate {
    acm_certificate_arn      = data.aws_acm_certificate.project.arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }
}

#################################
# S3 Bucket Policy
#################################

resource "aws_s3_bucket_policy" "project_policy" {
  bucket = aws_s3_bucket.project.id

  policy = jsonencode({
    Version = "2012-10-17"

    Statement = [
      {
        Sid    = "AllowCloudFrontReadOnly"
        Effect = "Allow"

        Principal = {
          Service = "cloudfront.amazonaws.com"
        }

        Action = [
          "s3:GetObject"
        ]

        Resource = "${aws_s3_bucket.project.arn}/*"

        Condition = {
          StringEquals = {
            "AWS:SourceArn" = aws_cloudfront_distribution.project.arn
          }
        }
      }
    ]
  })
}