import express from 'express';
import {
  ApolloServer,
  gql
} from 'apollo-server-express';
import cors from 'cors';
import {
  schema
} from './data/schema';
import {
  resolvers
} from './data/resolvers';
const app = express();
app.use(cors());

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
});

server.applyMiddleware({
  app,
  path: '/graphql'
});

app.listen({
  port: 7070
}, () => {
  console.log(` GraphQL Server is now running on http://localhost:7070/graphql`)
});