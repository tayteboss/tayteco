import { responsiveImageFragment } from "./fragments";

const PROJECTS_QUERY = `query Query {
	allProjects {
		title
		year
		category
		gallery {
			images {
				image {
					${responsiveImageFragment}
				}
			}
		}
		video {
			video {
				url
			}
		}
	}
}`;

export default PROJECTS_QUERY;