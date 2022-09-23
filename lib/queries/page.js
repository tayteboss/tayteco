const PAGE_QUERY = `
	query Query($pageSlug: String) {
		page(filter: {pageSlug: {eq: $pageSlug}}) {
			pageSlug
			seo: _seoMetaTags {
				attributes
				content
				tag
			}
		}
	}
`;

export default PAGE_QUERY;
