# incubator

minikube start   
eval $(minikube docker-env)  
docker build -t loc-service:v1 ./loc-service/   
docker build -t emp-service:v1 ./emp-service/  
docker build -t hr-service:v1 ./hr-service/  
kubectl apply -f ./kube/emp-service.yaml  
kubectl apply -f ./kube/loc-service.yaml  
-- kubectl apply -f ./kube/hr-service.yaml  
kubectl apply -f ./kube/ambassador.yaml
kubectl apply -f ./kube/hr-service-with-ambassador.yaml 

minikube service hr-service  

# Redeploy hr-service on minikube start 

kubectl delete services hr-service  
kubectl delete deployments hr-service  
kubectl get pods  
kubectl delete pods  hr-service-6d88f574cb-jlj78  

>>minikube service ambassador --url
>>http://192.168.99.100:32516
Open http://192.168.99.100:32516/graphiql

Introspection
-------------

{
  __schema {
    types {
      name
      description
      kind
    }
  }
}



{
  __type(name: "Query") {
    name
    fields {
      name
      args {
        name
        type {
          kind
          name
          ofType {
            name
          }
        }
      }
    }
  }
}


{
  __type(name: "Mutation") {
    name
    fields {
      name
      args {
        name 
        defaultValue
        type {
          kind
          name
          ofType {
            name
          }
        }
      }
    }
  }
}

{
  __type(name: "Location") {
    name
    fields {
      name
      type {
        name
        kind
      }
    }
  }
}

{
  __type(name: "DepartmentInput") {
    kind
    name
    inputFields {
      name
      description
    }
  }
}

{
  __type(name:"EmployeeFilter"){
    name
    description
    inputFields{
      name
      type {
        name
        description
      }
      description      
    }
    
  }
}


query Department {
  __type(name: "Department") {
    kind
    name
    fields {
      name
      description
      type {
        name
      }
    }
  }
}

----------------------------------------

query{departments{ __typename, departmentId, departmentName}}
query{departments{ departmentId, departmentName}}
query{departments{departmentId, departmentName,managerId,location{country}, employees{employeeId,email}}} 
query{employeesByFilter(filter:{departmentId:10}){firstName,lastName,departmentId}}
query{employeesByFilter(filter:{departmentId:20,firstName:"Matthew"}){firstName,lastName,departmentId}}  

----------------------------------------

mutation updateEmployee($empInput: EmployeeInput) {
  updateEmployee(input:$empInput) {
   employeeId
  }
}

{"empInput": {"employeeId": 100,"email": "updated@phoo.com"}}

{
  employees{
    employeeId
    firstName
    lastName
    email
  }
}

