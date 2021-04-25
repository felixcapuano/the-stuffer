# The Stuffer

private registry login : https://medium.com/clarusway/how-to-use-images-from-a-private-container-registry-for-kubernetes-aws-ecr-hosted-private-13a759e2c4ea
https://minikube.sigs.k8s.io/docs/handbook/registry/

## build docker images

docker build -t thestuffer-frontend ./thestuffer-frontend
docker build -t thestuffer-backend ./thestuffer-backend
docker build -t auth-backend ./auth-backend

## aws pushing

docker push 457436777387.dkr.ecr.eu-west-1.amazonaws.com/thestuffer-frontend:latest

docker push 457436777387.dkr.ecr.eu-west-1.amazonaws.com/thestuffer-backend:latest

docker push 457436777387.dkr.ecr.eu-west-1.amazonaws.com/auth-backend:latest

