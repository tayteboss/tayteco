import '../styles/fonts.css';
import { ThemeProvider } from 'styled-components';
import { useRouter } from 'next/router';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import { theme } from '../styles/theme';
import { GlobalStyles } from '../styles/global';
import * as ga from '../lib/tracking/google-analytics';
import * as fb from '../lib/tracking/facebook-pixel';
import GoogleAnalytics from '../components/common/Tracking/GoogleAnalytics';
import { FacebookPixel } from '../components/common/Tracking/FacebookPixel';

function App({ Component, pageProps }) {
	const [dashboardData, setDashboardData] = useState(null);
	const [cursorRefresh, setCursorRefresh] = useState(0);
	const [cursorLoading, setCursorLoading] = useState(false);
	const [faviconTheme, setFaviconTheme] = useState('thunder');
	const router = useRouter();

	const handleExitComplete = () => {
		window.scrollTo(0, 0);
	};

	useEffect(() => {
		window.scrollTo(0, 0);

		const setVh = () => {
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		};

		window.addEventListener('resize', () => {
			setVh();
		});

		setVh();
	}, []);

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
				<Layout
					data={dashboardData}
					cursorRefresh={() => setCursorRefresh(cursorRefresh + 1)}
					cursorLoading={cursorLoading}
					setFaviconTheme={setFaviconTheme}
				>
					<AnimatePresence
						onExitComplete={() => handleExitComplete()}
					>
						<Component
							{...pageProps}
							setDashboardData={setDashboardData}
							key={router.asPath}
							cursorRefresh={() => setCursorRefresh(cursorRefresh + 1)}
							setCursorLoading={(val) => setCursorLoading(val)}
							faviconTheme={faviconTheme}
						/>
					</AnimatePresence>
				</Layout>
			</ThemeProvider>
		</>
	);
}

export default App;
