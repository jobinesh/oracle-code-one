const locations = [{
    id: 1000,
    name: 'Foster City Centre',
    city: 'Foster City',
    street: '714 Bounty Dr',
    state: 'CA',
    zip: '94404',
    country: 'US'
  },
  {
    id: 1001,
    name: 'San Francisco',
    city: 'San Francisco',
    street: '475 Sansome St',
    state: 'CA',
    zip: '94111',
    country: 'US'
  }
];

let nextId = 1002;

export const resolvers = {
  Query: {
    locations: () => {
      return locations;
    },
    location: (root, {
      id
    }) => {
      return locations.find(location => location.id == id);
    }
  },

  Mutation: {
    addLocation: (root, args) => {
      const newLoc = {
        id: nextId++,
        name: args.name,
        street: args.street,
        city: args.city,
        state: args.state,
        zip: args.zip,
        country: args.country
      };
      locations.push(newLoc);
      return newLoc;
    },
  },
};