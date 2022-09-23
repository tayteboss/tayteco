import Script from 'next/script';

const GoogleAnalytics = () => {
	const GA = process.env.NEXT_PUBLIC_MEASUREMENT_ID;

	if( !GA )
	{
		return <></>
	}

	return (
		<>
			<Script src={`https://www.googletagmanager.com/gtag/js?id=${GA}`} strategy='afterInteractive' />
			<Script id="google-analytics" strategy='afterInteractive'>
				{`
					window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag('js', new Date());
					gtag('config', '${GA}');
				`}
			</Script>
		</>
	);

}

export default GoogleAnalytics;