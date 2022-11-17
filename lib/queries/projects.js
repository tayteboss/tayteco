import { responsiveImageFragment } from "./fragments";

const PROJECTS_QUERY = `query Query {
	allProjects {
		title
		year
		video {
			video {
				url
			}
		}
	}
}`;

export default PROJECTS_QUERY;