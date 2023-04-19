resource "aws_cloudwatch_log_group" "log_group" {
  name         = "/ecs/graphql-api-${var.environment}"
  skip_destroy = false
}
