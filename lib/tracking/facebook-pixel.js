export const pageview = (url) => {
	const FB = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;
	if (!FB) {
		return;
	}

	window.fbq('track', 'PageView');
};
