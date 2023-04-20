locals {
  base_definition = {
    name  = "graphql-api-${var.environment}-container",
    image = "043894507808.dkr.ecr.us-east-1.amazonaws.com/graphql-api:${var.image_tag}",
    cpu   = 0,
    portMappings = [
      {
        containerPort = 80,
        hostPort      = 80,
        protocol      = "tcp"
      }
    ],
    essential = true,
    environment = [
      {
        name  = "NODE_ENV",
        value = "${var.environment}"
      },
      {
        name  = "PORT",
        value = "80"
      }
    ],
    mountPoints = [],
    volumesFrom = [],
    logConfiguration = {
      logDriver = "awslogs",
      options = {
        awslogs-group         = "${aws_cloudwatch_log_group.log_group.name}",
        awslogs-region        = "${var.aws_region}",
        awslogs-stream-prefix = "ecs"
      }
    }
  }

  definitions = {
    test = jsonencode([
      merge(local.base_definition, {
        secrets = [
          {
            name      = "JWT_SECRET",
            valueFrom = "arn:aws:secretsmanager:us-east-1:479401498383:secret:graphql-api-secrets-46UvoX:JWT_SECRET::"
          },
          {
            name      = "DATABASE_URL",
            valueFrom = "arn:aws:secretsmanager:us-east-1:479401498383:secret:graphql-api-secrets-46UvoX:DATABASE_URL::"
          },
          {
            name      = "ALCHEMY_API_KEY",
            valueFrom = "arn:aws:secretsmanager:us-east-1:479401498383:secret:graphql-api-secrets-46UvoX:ALCHEMY_API_KEY::"
          },
          {
            name      = "MATIC_PRIVATE_KEY",
            valueFrom = "arn:aws:secretsmanager:us-east-1:479401498383:secret:graphql-api-secrets-46UvoX:MATIC_PRIVATE_KEY::"
          }
        ]
      })
    ])
    dev = jsonencode([
      merge(local.base_definition, {
        secrets = [
          {
            name      = "JWT_SECRET",
            valueFrom = "arn:aws:secretsmanager:us-east-1:043894507808:secret:graphql-api-secrets-ajTuEN:JWT_SECRET::"
          },
          {
            name      = "DATABASE_URL",
            valueFrom = "arn:aws:secretsmanager:us-east-1:043894507808:secret:graphql-api-secrets-ajTuEN:DATABASE_URL::"
          },
          {
            name      = "ALCHEMY_API_KEY",
            valueFrom = "arn:aws:secretsmanager:us-east-1:043894507808:secret:graphql-api-secrets-ajTuEN:ALCHEMY_API_KEY::"
          },
          {
            name      = "MATIC_PRIVATE_KEY",
            valueFrom = "arn:aws:secretsmanager:us-east-1:043894507808:secret:graphql-api-secrets-ajTuEN:MATIC_PRIVATE_KEY::"
          }
        ]
      })
    ])
  }
}
