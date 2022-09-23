import '../styles/fonts.css';
import { ThemeProvider } from 'styled-components';
import { useRouter } from 'next/router';
import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { theme } from '../styles/theme';
import { GlobalStyles } from '../styles/global';
import * as ga from '../lib/tracking/google-analytics';
import * as fb from '../lib/tracking/facebook-pixel';
import GoogleAnalytics from '../components/common/Tracking/GoogleAnalytics';
import { FacebookPixel } from '../components/common/Tracking/FacebookPixel';

function App({ Component, pageProps }) {
	const router = useRouter();

	const handleExitComplete = () => {
		window.scrollTo(0, 0);
	};

	// Setup google tracking
	const routerEvents = router.events;
	useEffect(() => {
		const handleRouteChange = (url) => {
			ga.pageview(url);
			fb.pageview();
		};

		// Assign the event on change
		routerEvents.on('routeChangeComplete', handleRouteChange);

		// When destroyed, destroy the event
		return () => {
			routerEvents.off('routeChangeComplete', handleRouteChange);
		};
	}, [routerEvents]);

	return (
		<>
			<GlobalStyles />
			<GoogleAnalytics />
			<FacebookPixel />
			<ThemeProvider theme={theme}>
				<Layout>
					<AnimatePresence
						onExitComplete={() => handleExitComplete()}
					>
						<Component {...pageProps} key={router.asPath} />
					</AnimatePresence>
				</Layout>
			</ThemeProvider>
		</>
	);
}

export default App;
