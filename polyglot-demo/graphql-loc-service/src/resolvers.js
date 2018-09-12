const channels = [{
  id: 1,
  name: 'soccer',
}, {
  id: 2,
  name: 'baseball',
}];
const locations = [{
  id: 2000,
  name: 'FosterCity',
  state: 'CA',
  country: 'US'
}, 
{
  id: 3000,
  name: 'Sanfrancisco',
  state: 'CA',
  country: 'US'
}];

let nextId = 3;

export const resolvers = {
  Query: {
    channels: () => {
      return channels;
    },
    channel: (root, { id }) => {
      return channels.find(channel => channel.id == id);
    },
    locations:() => {
      return locations;
    },
    location: (root, { id }) => {
      return locations.find(location => location.id == id);
    }
  },
  Mutation: {
    addChannel: (root, args) => {
      const newChannel = { id: nextId++, name: args.name };
      channels.push(newChannel);
      return newChannel;
    },
  },
};
