# Oracle Code One 2018 demo  
# Set up Kubernetes locally  
Install minikube https://kubernetes.io/docs/tasks/tools/install-minikube/  
# Set up demo project 
git clone https://github.com/jobinesh/oracle-code-one.git  
cd  &lt;oracle-code-one>/polyglot-demo  
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

Open http://192.168.99.100:32402/graphiql  on browser (Please note that  URL changes with value returned by 'minikube service ambassador --url' )  
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
