import * as express from 'express';
import * as bodyParser from 'body-parser';
import {graphqlExpress, graphiqlExpress} from 'apollo-server-express';
import {makeRemoteExecutableSchema, mergeSchemas, introspectSchema} from 'graphql-tools';
import {createApolloFetch,} from 'apollo-fetch';

async function run() {
	const createRemoteSchema = async (uri: string) => {
		const fetcher = createApolloFetch({uri});
		return makeRemoteExecutableSchema({
			schema: await introspectSchema(fetcher),
			fetcher
		});
	}
	const locServiceSchema = await createRemoteSchema(`${process.env.EMP_SVC_URI}/graphql`)
	const hrServiceSchema = await createRemoteSchema(`${process.env.LOC_SVC_URI}/graphql`);
	const linkSchemaDefs = `
		extend type Department {
			location: Location
		}
  	`
	const schema = mergeSchemas({
		schemas: [locServiceSchema, hrServiceSchema, linkSchemaDefs],
		resolvers: mergeInfo => ({
			Department: {
				location: {
					fragment: `fragment LocationFragment on Department {locationId}`,
					resolve(parent: any, args: any, context: any, info: any) {
						const id: any = parent.locationId
						return mergeInfo.delegate(
							'query',
							'location',
							{id},
							context,
							info
						)
					}
				}
			}
		})
	})
    //schemas: [hrServiceSchema, locServiceSchema]
	const app = express();

	app.use('/graphql', bodyParser.json(), graphqlExpress({schema}));

	app.use(
		'/graphiql',
		graphiqlExpress({
			endpointURL: '/graphql'
		})
	);

	app.listen(3000);
	console.log('Server running. Open http://localhost:3000/graphiql to run queries.');
}

try {
	run();
} catch (e) {
	console.log(e, e.message, e.stack);
}
