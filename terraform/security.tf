# resource "aws_security_group_rule" "postgres_access" {
#   security_group_id = aws_default_vpc.vpc.default_security_group_id
#   description       = "Postgres access from graphql-api-${var.environment}-vpc"

#   type      = "ingress"
#   from_port = 5432
#   to_port   = 5432
#   protocol  = "tcp"
#   cidr_blocks = [
#     aws_vpc.vpc.cidr_block
#   ]
# }

resource "aws_default_security_group" "default" {
  vpc_id = aws_vpc.vpc.id

  egress = [
    {
      cidr_blocks = [
        "0.0.0.0/0",
      ]
      description      = ""
      from_port        = 0
      ipv6_cidr_blocks = []
      prefix_list_ids  = []
      protocol         = "-1"
      security_groups  = []
      self             = false
      to_port          = 0
    },
  ]

  ingress = [
    {
      cidr_blocks = [
        aws_vpc.vpc.cidr_block
      ]
      description      = "Default graphql-api-${var.environment} VPC"
      from_port        = 5432
      ipv6_cidr_blocks = []
      prefix_list_ids  = []
      protocol         = "tcp"
      security_groups  = []
      self             = false
      to_port          = 5432
    },
  ]

  revoke_rules_on_delete = false
  tags = {
    "Name" = "RDS-Postgres graphql-api-${var.environment}"
  }
}

resource "aws_security_group" "web_everyone2" {
  name        = "web-everyone2"
  description = "Allow web traffic from everyone"
  vpc_id      = aws_vpc.vpc.id

  egress = [
    {
      cidr_blocks = [
        "0.0.0.0/0",
      ]
      description      = ""
      from_port        = 0
      ipv6_cidr_blocks = []
      prefix_list_ids  = []
      protocol         = "-1"
      security_groups  = []
      self             = false
      to_port          = 0
    },
  ]

  ingress = [
    {
      cidr_blocks = [
        "0.0.0.0/0",
      ]
      description = ""
      from_port   = 443
      ipv6_cidr_blocks = [
        "::/0",
      ]
      prefix_list_ids = []
      protocol        = "tcp"
      security_groups = []
      self            = false
      to_port         = 443
    },
    {
      cidr_blocks = [
        "0.0.0.0/0",
      ]
      description = ""
      from_port   = 80
      ipv6_cidr_blocks = [
        "::/0",
      ]
      prefix_list_ids = []
      protocol        = "tcp"
      security_groups = []
      self            = false
      to_port         = 80
    },
  ]

  revoke_rules_on_delete = false

  tags = {
    Name = "web-everyone2"
  }
}

resource "aws_security_group" "graphql_api" {
  name   = "graphql-api-${var.environment}"
  vpc_id = aws_vpc.vpc.id

  egress = [
    {
      cidr_blocks = [
        "0.0.0.0/0",
      ]
      description      = ""
      from_port        = 0
      ipv6_cidr_blocks = []
      prefix_list_ids  = []
      protocol         = "-1"
      security_groups  = []
      self             = false
      to_port          = 0
    },
  ]

  ingress = [
    {
      cidr_blocks = [
        "0.0.0.0/0",
      ]
      description      = ""
      from_port        = 80
      ipv6_cidr_blocks = []
      prefix_list_ids  = []
      protocol         = "tcp"
      security_groups  = []
      self             = false
      to_port          = 80
    },
  ]

  revoke_rules_on_delete = false
}
