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
	//LOC_SVC_URI=http://localhost:7070 EMP_SVC_URI=http://localhost:8080 
	console.log('Schema fetch:v1 - begin');
	const locServiceSchema = await createRemoteSchema(`${process.env.LOC_SVC_URI}/graphql`);
	const empServiceSchema = await createRemoteSchema(`${process.env.EMP_SVC_URI}/graphql`)
	//const locServiceSchema = await createRemoteSchema('http://localhost:7070/graphql');
	//const empServiceSchema = await createRemoteSchema('http://localhost:8080/graphql')
	
	console.log('Schema fetch - end');

	const linkSchemaDefs = `
		extend type Department {
			location: Location
		}
  	`
	const schema = mergeSchemas({
		schemas: [empServiceSchema, locServiceSchema, linkSchemaDefs],
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
    
	const app = express();

	app.use('/graphql', bodyParser.json(), graphqlExpress({schema}));

	app.use(
		'/graphiql',
		graphiqlExpress({
			endpointURL: '/graphql'
		})
	);

	app.listen(9090);
	console.log('Server running. Open http://localhost:9090/graphiql to run queries.');
}

try {
	run();
} catch (e) {
	console.log(e, e.message, e.stack);
}
