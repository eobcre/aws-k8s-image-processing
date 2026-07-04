resource "aws_ecr_repository" "api" {
  name                 = "ai-caption-api"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }
}