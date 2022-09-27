import { GraphQLClient } from 'graphql-request';
import DASHBOARD_QUERY from './queries/dashboard';
import PROJECTS_QUERY from './queries/projects';

const request = ({ query, variables, preview }) => {
	const endpoint = preview
		? `https://graphql.datocms.com/preview`
		: `https://graphql.datocms.com/`;
	const client = new GraphQLClient(endpoint, {
		headers: {
			authorization: `Bearer ${process.env.DATOCMS_API_TOKEN}`,
		},
	});
	return client.request(query, variables);
};

export const getDashboard = async (preview) => {
	const data = await request({
		query: DASHBOARD_QUERY,
		preview,
	});

	return data;
};

export const getProjects = async (preview) => {
	const data = await request({
		query: PROJECTS_QUERY,
		preview,
	});

	return data;
};
