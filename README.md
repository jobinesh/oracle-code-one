# incubator
<<<<<<< HEAD
minikube start
eval $(minikube docker-env)
docker build -t loc-service:v1 ./loc-service/
docker build -t emp-service:v1 ./emp-service/
docker build -t hr-service:v1 ./hr-service/
kubectl apply -f ./kube/emp-service.yaml
kubectl apply -f ./kube/loc-service.yaml
kubectl apply -f ./kube/hr-service.yaml
minikube service hr-service
=======

minikube start  
eval $(minikube docker-env)  
docker build -t graphql-loc-service:v1 ./graphql-loc-service/  
docker build -t graphql-emp-service:v1 ./graphql-emp-service/  
docker build -t graphql-api-service:v1 ./graphql-api-service/  
kubectl apply -f ./kube/emp-service.yaml   
kubectl apply -f ./kube/loc-service.yaml  
kubectl apply -f ./kube/api-gateway.yaml  
minikube service api-gateway  


>>>>>>> f7b4e7d4a57e755e1c727079f8eee4fa76956a28
