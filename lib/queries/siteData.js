const SITE_DATA_QUERY = `
	query Query($pageSlug: String) {
		page(filter: {pageSlug: {eq: $pageSlug}}) {
			
		}
	}
`;

export default SITE_DATA_QUERY;
