# Building a Polyglot GraphQL Server  
This example is used for demonstrating GaphQL features dicussed as part of the following talk in Oracle Code One 2018 : https://oracle.rainfocus.com/widget/oracle/oow18/catalogcodeone18?search=DEV6113  
  
To checkout the presentation slides used for this session [visit this link](https://static.rainfocus.com/oracle/oow18/sess/1526618246355001wDNO/PF/DEV6113_Purushothaman_15404417239460019Dyp.pdf)   
  
If you are new to Kubernetes, please read the following article for a quick start :
https://hackernoon.com/getting-started-with-microservices-and-kubernetes-76354312b556  

Here are the steps for running this demo:  
  
1. Install minikube locally so that you can have a local Kubernetes environment to try out this demo : https://kubernetes.io/docs/tasks/tools/install-minikube/  
2. Clone the demo project, open the terminal and go to the project folder (polyglot-demo). Following steps assume that you are on this folder
git clone https://github.com/jobinesh/oracle-code-one.git  
cd  &lt;oracle-code-one>/polyglot-demo  
3. Start the minikube  
minikube start   
4. Make Minikube to use  local docker registry  
eval $(minikube docker-env)  
5. Build docker images for all GraphQL services  
docker build -t loc-service:v1 ./loc-service/   
docker build -t emp-service:v1 ./emp-service/  
docker build -t hr-service:v1 ./hr-service/  
6. Deploy and boot up employee and location services in Kubernetes  
kubectl apply -f ./kube/emp-service.yaml  
kubectl apply -f ./kube/loc-service.yaml  
7. Deploy and boot up ambassador (ingress controller) 
kubectl apply -f ./kube/ambassador.yaml  
8. Deploy and boot up hr-service. This service is exposed via ambassador ingress controller for use by external clients  
kubectl apply -f ./kube/hr-service-with-ambassador.yaml  
9. Get the URL for reaching ambassador ingress controller. This is used for accessing hr-service exposed via ambassador in next step     
minikube service ambassador --url  
e.g: http://192.168.99.100:32402   
10. Open the URL that you got in previous step  on browser and append graphiql ( e.g http://192.168.99.100:32402/graphiql )  
11. You can now try all GraphQL queries using graphiql UI editor window.   
  
Following are some examples for you to try out on graphiql window :  
```javascript
Demo - GraphQL in JavaScript  
----------------------------  
1. Introspection  - List all types  

{  
  __schema {  
    types {  
      name  
      description  
      kind  
    }  
  }  
}  

2. Introspection -  Location type  
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
  
3. Query - Find all locations   
  
{  
  locations {  
    id  
    name  
    street  
    city   
    zip  
    country  
  }  
}  
  
4. Query - Find location by id=1000   

{  
  location(id: 1000) {  
    id  
    street  
    city  
    zip  
    country  
  }  
}   
  
5. Query - Find location by id=1000  using variables  
query  location($locationId:ID!){  
  location(id:$locationId) {  
    id  
    street  
    city  
    zip  
    country  
  }  
  
}  
    
{"locationId": 1000}  
  
Demo - GraphQL in Java  
------------------------  
1.  Introspection - Department type  

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

2. Introspection - EmployeeFilter input type 
{
  __type(name: "EmployeeFilter") {
    name
    description
    inputFields {
      name
      type {
        name
        description
      }
      description
    }
  }
}  

3.  Introspection - all mutation types 

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

2. Query - Find all departments details  

{
  departments {
    departmentId
    departmentName
    managerId
    employees {
      employeeId
      email
    }
  }
}    

3. Query - Find  department by id = 10 
{
  employeesByFilter(filter: {departmentId: 10}) {
    firstName
    lastName
    departmentId
  }
}

4. Query - Find employee by filter object 
{
  employeesByFilter(filter: {departmentId: 20, firstName: "Matthew"}) {
    firstName
    lastName
    departmentId
  }
}  


5. Mutation - modify employee

mutation updateEmployee($empInput: EmployeeInput) {
  updateEmployee(input: $empInput) {
    employeeId
  }
}  


{"empInput": {"employeeId": 100,"email": "updated@phoo.com"}}  

 
Demo - Schema Stitching
------------------------
1. Introspection - all query types  

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

2. Query - Find all departments details  

{
  departments {
    departmentId
    departmentName
    managerId
    location {
      city
      zip
      country
    }
    employees {
      employeeId
      email
    }
  }
} 

3. Mutation - add new location  

mutation addLocation {
  addLocation(name: "Redwood City", city: "Redwood City", street: "100 Oracle Pkwy", zip: "94065", state: "CA", country: "US") {
    id
    name
    city
  }
}  
```
