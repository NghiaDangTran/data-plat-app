# Docker

- a container for software
- from a server of VM, u have docker running in one or multiple one
- save software in DOcker images or Docker hub
- Docker vs VM
  - Docker is sort of VM, but not the same
    - VM is isolated OS, where each have pieces of the hardware
    - Docker is one hardware, but each container is run on the own separate osm which is on top os the host OS

# ECS

## EC2 launch Type

- run docker on AWS = ECS Task on ECS Cluster
- EC2 launch type: u must provision and maintain the infra
- each ec2 instance must run the ECs agent to register the ECs CLuster
- aws only take care start/stop the container
- > why dont we just run Docker on EC2:
- > ECS (Elastic Container Service) provides integrated container orchestration, scaling, load balancing, and tight integration with other AWS services, simplifying container management and deployment at scale. While you can run Docker directly on EC2, ECS abstracts and manages many of the complexities, offering a more streamlined, managed, and scalable solution for deploying containerized applications on AWS.

## Fargate Launch Type

- launch Docker container on AWS
- u dont need to care about ec2
- it all `serverless`

## IAM roles for ECs

- EC2 instance Profile (EC2 launch type only)
  - used by EC2 agent (ingress of Docker, connect api)
  - make apu call to ecs
  - ...
- Ecs Task Role:
  - allow each task to have a specific role
  - task role is defined in the `task definition`

## Load Balancer Integrations

- Alp (Application load balancer) supported and work for most use case
- NEtwork load balancer recommended only for high speed or performance use cases, or to pair it with aws private link
- Classic load balancer supported but not recommended no advanced lv no fargate

## Data Volumes (EFS)

- mount EFS onto ECS tasks
- work for both EC2 and Fargate
- fargate +EFS =serverless
- use for persistent multi-AZ shared storage for ur containers
