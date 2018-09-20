# incubator

minikube start  
eval $(minikube docker-env)  
docker build -t graphql-loc-service:v1 ./graphql-loc-service/  
docker build -t graphql-emp-service:v1 ./graphql-emp-service/  
docker build -t graphql-api-service:v1 ./graphql-api-service/  
kubectl apply -f ./kube/emp-service.yaml   
kubectl apply -f ./kube/loc-service.yaml  
kubectl apply -f ./kube/api-gateway.yaml  
minikube service api-gateway  


