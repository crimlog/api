resource "aws_lb_target_group" "target_group" {
  name     = "graphql-api-${var.environment}"
  port     = 80
  protocol = "HTTP"
  vpc_id   = aws_vpc.vpc.id

  connection_termination        = false
  ip_address_type               = "ipv4"
  protocol_version              = "HTTP1"
  proxy_protocol_v2             = false
  target_type                   = "ip"
  load_balancing_algorithm_type = "round_robin"

  health_check {
    enabled             = true
    healthy_threshold   = 3
    interval            = 60
    matcher             = "200"
    path                = "/health"
    port                = "traffic-port"
    protocol            = "HTTP"
    timeout             = 5
    unhealthy_threshold = 2
  }

  stickiness {
    cookie_duration = 86400
    enabled         = false
    type            = "lb_cookie"
  }
}

resource "aws_lb" "alb" {
  name               = "graphql-api-${var.environment}-alb"
  load_balancer_type = "application"
  subnets = [
    aws_subnet.subnet["us-east-1b"].id,
  ]
  internal                         = false
  ip_address_type                  = "ipv4"
  enable_cross_zone_load_balancing = true

  security_groups = [
    aws_default_security_group.default.id,
    aws_security_group.web_everyone2.id,
    aws_security_group.graphql_api.id
  ]
}

resource "aws_lb_listener" "listener" {
  load_balancer_arn = aws_lb.alb.arn
  port              = 443
  protocol          = "HTTPS"

  ssl_policy = "ELBSecurityPolicy-2016-08"

  default_action {
    order            = 1
    type             = "forward"
    target_group_arn = aws_lb_target_group.target_group.arn
  }
}
