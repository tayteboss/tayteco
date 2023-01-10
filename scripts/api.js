require('dotenv').config({
	path: '.env.local',
});

const fetch = require('node-fetch');

const fetchAPI = async (query, { variables } = {}) => {
	const url = `https://graphql.datocms.com/`;
	const json = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			authorization: `Bearer ${process.env.DATOCMS_API_TOKEN}`,
			'X-Environment': 'main'
		},
		body: JSON.stringify({
			query,
			variables,
		}),
	})
		.then((response) => {
			response.json()
		})
		.then((json) => {
			json
		});
	return json?.data;
};

const getSiteData = async () => {
	const query = `query Query {
		dashboard {
			description {
				blocks
				links
				value
			}
      menuDescription {
        blocks
        links
        value
      }
			instagramUrl
			linkedinUrl
			email
			aoc
			headshotVideo {
				url
			}
		}
	}`;
	const data = await fetchAPI(query);
	if (data?.length <= 0 || data === undefined) {
		return [];
	}
	return data;
};

module.exports = {
	getSiteData,
};
