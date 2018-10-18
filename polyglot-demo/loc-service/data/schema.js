import {
  ApolloServer,
  gql
} from 'apollo-server-express';

const schema = gql `
    type Location {
      id: ID!
      name: String
      street: String
      city: String
      state: String
      zip: String
      country: String
    }
    # This type specifies the entry points into our API.
    type Query {
      locations: [Location]
      location(id: ID!): Location
    }

    # The mutation root type, used to define all mutations.
    type Mutation {
      # A mutation to add a new location to the list of locations
      addLocation(id: ID, name: String!, street: String, city: String!, state: String, zip: String, country: String): Location
    }
    `;


export {
  schema
};