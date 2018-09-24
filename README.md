# incubator
minikube start
eval $(minikube docker-env)
docker build -t loc-service:v1 ./loc-service/
docker build -t emp-service:v1 ./emp-service/
docker build -t hr-service:v1 ./hr-service/
kubectl apply -f ./kube/emp-service.yaml
kubectl apply -f ./kube/loc-service.yaml
kubectl apply -f ./kube/hr-service.yaml
minikube service hr-service