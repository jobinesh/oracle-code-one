# Oracle Code One 2018 demo

git clone https://github.com/jobinesh/oracle-code-one.git
cd  <oracle-code-one>/polyglot-demo
minikube start   
eval $(minikube docker-env) 
docker build -t loc-service:v1 ./loc-service/   
docker build -t emp-service:v1 ./emp-service/  
docker build -t hr-service:v1 ./hr-service/  
kubectl apply -f ./kube/emp-service.yaml  
kubectl apply -f ./kube/loc-service.yaml  
kubectl apply -f ./kube/ambassador.yaml
kubectl apply -f ./kube/hr-service-with-ambassador.yaml 

>>minikube service ambassador --url  
>>http://192.168.99.100:32402  

Open http://192.168.99.100:32402/graphiql  on browser (Please note that  URL changes with returned by 'minikube service ambassador --url' )  
Following are some examples for you to try out on graphiql window :

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

Query 
----------------------------------------

query{departments{ __typename, departmentId, departmentName}}
query{departments{ departmentId, departmentName}}
query{departments{departmentId, departmentName,managerId,location{country}, employees{employeeId,email}}} 
query{employeesByFilter(filter:{departmentId:10}){firstName,lastName,departmentId}}
query{employeesByFilter(filter:{departmentId:20,firstName:"Matthew"}){firstName,lastName,departmentId}}  

Mutation
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


mutation addLocation {
  addLocation(
    name: "Redwood City",
    city: "Redwood City",
    street: "100 Oracle Pkwy",
    zip: "94065",
    state: "CA",
    country: "US"
  ) {
    id
    name
    city
  }
}
