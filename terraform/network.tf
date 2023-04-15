locals {
  subnet_availability_zones = [
    "us-east-1b",
  ]

  # divide a large CIDR into smaller CIDRs for each environment's VPC
  # creates a map with structure: { environment: cidr_block }
  vpc_cidr_blocks = { for idx, vpc_subnet in cidrsubnets("172.32.0.0/12", [for env in local.environments : 4]...) : local.environments[idx] => vpc_subnet }

  # for each availability zone, create a subnet CIDR block
  subnet_cidr_blocks = cidrsubnets(local.vpc_cidr_blocks[var.environment], [for env in local.environments : 2]...)
}

resource "aws_default_vpc" "vpc" {
  force_destroy                        = false
  enable_network_address_usage_metrics = false
}

resource "aws_vpc" "vpc" {
  cidr_block                           = local.vpc_cidr_blocks[var.environment]
  assign_generated_ipv6_cidr_block     = false
  enable_dns_hostnames                 = true
  enable_network_address_usage_metrics = false

  tags = {
    Name = "graphql-api-${var.environment}-vpc"
  }
}

resource "aws_internet_gateway" "gw" {
  vpc_id = aws_vpc.vpc.id

  tags = {
    Name = "main"
  }
}

# add a route to the default route table without modifying it
resource "aws_route" "vpc_peering_route" {
  route_table_id            = aws_default_vpc.vpc.default_route_table_id
  destination_cidr_block    = aws_vpc.vpc.cidr_block
  vpc_peering_connection_id = aws_vpc_peering_connection.peering_connection.id

  depends_on = [
    aws_vpc_peering_connection.peering_connection
  ]
}

resource "aws_default_route_table" "default" {
  default_route_table_id = aws_vpc.vpc.default_route_table_id

  # Internet Gateway
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.gw.id
  }

  # VPC Peering
  route {
    cidr_block                = aws_default_vpc.vpc.cidr_block
    vpc_peering_connection_id = aws_vpc_peering_connection.peering_connection.id
  }

  depends_on = [
    aws_vpc_peering_connection.peering_connection
  ]
}

resource "aws_subnet" "subnet" {
  for_each = { for idx, az in local.subnet_availability_zones : az => idx }
  # each.key = availability zone
  # each.value = index

  vpc_id                              = aws_vpc.vpc.id
  availability_zone                   = each.key
  cidr_block                          = local.subnet_cidr_blocks[each.value]
  map_public_ip_on_launch             = true
  private_dns_hostname_type_on_launch = "ip-name"
}

resource "aws_vpc_peering_connection" "peering_connection" {
  peer_vpc_id = aws_default_vpc.vpc.id
  vpc_id      = aws_vpc.vpc.id
  auto_accept = true

  accepter {
    allow_remote_vpc_dns_resolution = true
  }

  requester {
    allow_remote_vpc_dns_resolution = true
  }

  tags = {
    Name = "VPC Peering between main vpc and graphql-api-${var.environment}"
  }
}
