resource "aws_ecs_task_definition" "definition" {
  family                   = "graphql-api-${var.environment}-task"
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
  network_mode             = "awsvpc"
  cpu                      = "256"
  memory                   = "512"
  requires_compatibilities = ["FARGATE"]
  skip_destroy             = false
  runtime_platform {
    operating_system_family = "LINUX"
  }

  container_definitions = local.definitions[var.environment]
}

resource "aws_ecs_cluster" "cluster" {
  name = "graphql-api-${var.environment}"

  setting {
    name  = "containerInsights"
    value = "disabled"
  }
}

// start the AWS task
resource "aws_ecs_service" "service" {
  name                              = "graphql-api-${var.environment}-svc"
  cluster                           = aws_ecs_cluster.cluster.id
  task_definition                   = aws_ecs_task_definition.definition.arn
  launch_type                       = "FARGATE"
  desired_count                     = 1
  enable_ecs_managed_tags           = true
  health_check_grace_period_seconds = 0
  platform_version                  = "LATEST"
  propagate_tags                    = "NONE"
  wait_for_steady_state             = false

  deployment_circuit_breaker {
    enable   = false
    rollback = false
  }

  deployment_controller {
    type = "ECS"
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.target_group.arn
    container_name   = "graphql-api-${var.environment}-container"
    container_port   = 80
  }

  network_configuration {
    assign_public_ip = true
    security_groups = [
      aws_security_group.graphql_api.id
    ]
    subnets = [
      aws_subnet.subnet["us-east-1b"].id,
    ]
  }

  depends_on = [
    aws_internet_gateway.gw
  ]
}
