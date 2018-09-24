# hr-service
A simple GraphQL server that demonstrates Schema stitching feature.

Schema stitching is the idea of automatically combining two or more GraphQL schemas into one. It can be used to modularize a single GraphQL codebase, integrate with other APIs, or just combine two public APIs into one. This is going to be one of the main features of the 2.0 release of [graphql-tools](https://github.com/apollographql/graphql-tools/pull/382), a library for creating and manipulating GraphQL schemas in JavaScript.


### Running the example

docker build -t hr-service:v1 .
docker run -p 9090:9090  hr-service:v1 