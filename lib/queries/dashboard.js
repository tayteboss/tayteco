import { contentFragment } from "./fragments";

const DASHBOARD_QUERY = `query Query {
	dashboard {
		description {
			${contentFragment}
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

export default DASHBOARD_QUERY;