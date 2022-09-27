import { contentFragment } from "./fragments";

const DASHBOARD_QUERY = `query Query {
	dashboard {
		introductionExcerpt
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
		workAvailabilityIconColour {
			hex
		}
		workAvailabilityIdleTitle
		workAvailabilityHoverTitle
	}
}`;

export default DASHBOARD_QUERY;