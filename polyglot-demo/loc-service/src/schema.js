import {
  makeExecutableSchema,
} from 'graphql-tools';

import { resolvers } from './resolvers';

const typeDefs = `
    type Location {
      id: ID!
      name: String
      street: String
      city: String
      state: String
      zip: String
      country: String
    }
    # This type specifies the entry points into our API. In this case
    # there is only one - "channels" - which returns a list of channels.
    type Query {
      locations: [Location]
      location(id: ID!): Location
    }

    # The mutation root type, used to define all mutations.
    type Mutation {
      # A mutation to add a new channel to the list of channels
      addLocation(id: ID, name: String!, street: String, city: String!, state: String, zip: String, country: String): Location
    }
    `;

const schema = makeExecutableSchema({ typeDefs, resolvers });
export { schema };
