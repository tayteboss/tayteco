export const pageview = (url) => {
	const GA = process.env.NEXT_PUBLIC_MEASUREMENT_ID;
	if (!GA) {
		return;
	}

	window.gtag('config', GA, {
		path_url: url,
	});
};

export const event = ({ action, category, label, value }) => {
	window.gtag('event', action, {
		event_category: category,
		event_label: label,
		value,
	});
};
