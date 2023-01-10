import { contentFragment } from "./fragments";

const DASHBOARD_QUERY = `query Query {
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
		arenaUrl
		linkedinUrl
		email
		aoc
		headshotVideo {
			url
		}
		isAvailableForWork
		mobileShowreel {
			url
		}
	}
}`;

export default DASHBOARD_QUERY;