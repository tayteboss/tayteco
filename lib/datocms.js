import { GraphQLClient } from 'graphql-request';
import ALL_PAGES_QUERY from './queries/allPages';
import PAGE_QUERY from './queries/page';
import SITE_QUERY from './queries/siteData';

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

export const getSiteData = async () => {
	const data = await request({
		query: SITE_QUERY,
		variables: { siteId: process.env.SITE_ID },
	});

	return data;
};

export const getAllPages = async (siteId) => {
	const data = await request({
		query: ALL_PAGES_QUERY,
		variables: { siteId },
	});

	return data;
};

export const getPage = async (pageSlug, preview) => {
	const data = await request({
		query: PAGE_QUERY,
		variables: { pageSlug },
		preview,
	});

	return data;
};
