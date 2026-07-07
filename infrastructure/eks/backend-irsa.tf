#################################
# Backend IRSA
#################################

# IRSA - IAM Roles for Service Accounts
# allow backend pod (EKS) to use S3 upload & invoke bedrock and generate

# retrieve current AWS account information
data "aws_caller_identity" "current" {}

# create IAM policy allows backend pods
# to upload files to S3 and invoke bedrock model
resource "aws_iam_policy" "backend_s3_policy" {
  name        = "Backend-S3-Bedrock-For-EKS-Policy"
  description = "Allow backend pods to upload files to S3 & invoke bedrock and generate"

  policy = file("${path.module}/policies/backend-s3-bedrock-policy.json")
}

# create IAM role for backend pods
resource "aws_iam_role" "backend_s3_role" {
  name = "Backend-S3-Bedrock-For-EKS-Role"
  # allow EKS service account to assume this role via OIDC
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          Federated = aws_iam_openid_connect_provider.eks.arn
        }
        Action = "sts:AssumeRoleWithWebIdentity"
        Condition = {
          StringEquals = {
            # backend-service-account only
            "${local.eks_oidc_provider_url}:sub" = "system:serviceaccount:default:backend-service-account"
            "${local.eks_oidc_provider_url}:aud" = "sts.amazonaws.com"
          }
        }
      }
    ]
  })
}

# attach Backend-S3-Bedrock-For-EKS-Policy to Backend-S3-Bedrock-For-EKS-Role
resource "aws_iam_role_policy_attachment" "backend_s3_attach" {
  role       = aws_iam_role.backend_s3_role.name
  policy_arn = aws_iam_policy.backend_s3_policy.arn
}