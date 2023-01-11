import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { getDashboard, getProjects } from '../lib/datocms';
import ProjectGrid from '../components/blocks/ProjectGrid';
import ProjectList from '../components/blocks/ProjectList';
import MobileShowreel from '../components/blocks/MobileShowreel';
import { NextSeo } from 'next-seo';
import Head from 'next/head';
import Favicons from '../utils/Favicons';

const PageWrapper = styled.div`
	background: var(--colour-black);
	scroll-snap-align: ${(props) => props.$isReady ? 'end' : 'unset'};

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		scroll-snap-align: unset;
	}
`;

const PageWrapperInner = styled.div`
	padding-top: 32px;
	padding-left: ${(props) => props.$gridIsActive ? '0' : '16px'};
	padding-right: ${(props) => props.$gridIsActive ? '16px' : '0'};
	display: flex;
	column-gap: 16px;
	height: calc(100vh - 55px);

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		display: none;
	}
`;

const PageWrapperMobile = styled.div`
	display: none;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		display: block;
	}
`;

const Page = ({
	data,
	projects,
	setDashboardData,
	setCursorLoading,
	faviconTheme
}) => {
	const [gridIsActive, setGridIsActive] = useState(true);
	const [isReady, setIsReady] = useState(false);

	const timeoutId = useRef(null);

	const handleViewSwitchLogic = (isMouseOver, viewToOpen) => {
		timeoutId.current = setTimeout(() => {
			viewToOpen === 'grid' ? setGridIsActive(true) : setGridIsActive(false);
		}, 1300);

		if (!isMouseOver) {
			clearTimeout(timeoutId.current);
			setCursorLoading(false);
		} else {
			setCursorLoading(true);
		}
	};

	const handleGridMouseOverOut = (action) => {
		if (gridIsActive) return;
		clearTimeout(timeoutId.current);

		if (action === 'over') {
			handleViewSwitchLogic(true, 'grid');
		} else {
			handleViewSwitchLogic(false, 'grid');
		}
	};

	const handleListMouseOverOut = (action) => {
		if (!gridIsActive) return;
		clearTimeout(timeoutId.current);

		if (action === 'over') {
			handleViewSwitchLogic(true, 'list');
		} else {
			handleViewSwitchLogic(false, 'list');
		}
	};

	useEffect(() => {
		setCursorLoading(false);
	}, [gridIsActive]);
	

	useEffect(() => {
		setDashboardData(data?.dashboard);

		const timer = setTimeout(() => {
			setIsReady(true);

			return () => {
				clearTimeout(timer);
			}
		}, 500);
	}, [data]);
	
	return (
		<PageWrapper $isReady={isReady}>
			<NextSeo
				openGraph={{
					type: 'website',
					title: data?.dashboard?.seoPageTitle ? data?.dashboard.seoPageTitle : 'tayte.co',
					description: data?.dashboard?.seoPageDescription,
					images: [
						{
							url: data?.dashboard?.seoOggImage.url,
							width: 800,
							height: 600
						}
					]
				}}
				title={data?.dashboard?.seoPageTitle ? data?.dashboard.seoPageTitle : 'tayte.co'}
				description={data?.dashboard?.seoPageDescription}
			/>
			{faviconTheme && (
				<Head>
					{/* <link rel="apple-touch-icon" sizes="180x180" href="/favicons/clear/apple-touch-icon.png" />
					<link rel="icon" type="image/png" sizes="32x32" href="/favicons/clear/favicon-32x32.png" />
					<link rel="icon" type="image/png" sizes="16x16" href="/favicons/clear/favicon-16x16.png" />
					<link rel="manifest" href="/favicons/clear/site.webmanifest" /> */}
					<link rel="shortcut icon" href={`/favicons/${faviconTheme}/favicon.ico`} />
					{/* <meta name="msapplication-TileColor" content="#da532c" />
					<meta name="msapplication-config" content="/favicons/clear/browserconfig.xml" />
					<meta name="theme-color" content="#ffffff" /> */}

					{
						// faviconTheme === 'Clear' && (
						// 	<>
						// 		<link rel="apple-touch-icon" sizes="180x180" href="/favicons/clear/apple-touch-icon.png" />
						// 		<link rel="icon" type="image/png" sizes="32x32" href="/favicons/clear/favicon-32x32.png" />
						// 		<link rel="icon" type="image/png" sizes="16x16" href="/favicons/clear/favicon-16x16.png" />
						// 		<link rel="manifest" href="/favicons/clear/site.webmanifest" />
						// 		<link rel="shortcut icon" href="/favicons/clear/favicon.ico" />
						// 		<meta name="msapplication-TileColor" content="#da532c" />
						// 		<meta name="msapplication-config" content="/favicons/clear/browserconfig.xml" />
						// 		<meta name="theme-color" content="#ffffff" />
						// 	</>
						// ),
						// faviconTheme === 'Clouds' && (
						// 	<>
						// 		<link rel="apple-touch-icon" sizes="180x180" href="/favicons/clouds/apple-touch-icon.png" />
						// 		<link rel="icon" type="image/png" sizes="32x32" href="/favicons/clouds/favicon-32x32.png" />
						// 		<link rel="icon" type="image/png" sizes="16x16" href="/favicons/clouds/favicon-16x16.png" />
						// 		<link rel="manifest" href="/favicons/clouds/site.webmanifest" />
						// 		<link rel="shortcut icon" href="/favicons/clouds/favicon.ico" />
						// 		<meta name="msapplication-TileColor" content="#da532c" />
						// 		<meta name="msapplication-config" content="/favicons/clouds/browserconfig.xml" />
						// 		<meta name="theme-color" content="#ffffff" />
						// 	</>
						// ),
						// faviconTheme === 'Rain' && (
						// 	<>
						// 		<link rel="apple-touch-icon" sizes="180x180" href="/favicons/rain/apple-touch-icon.png" />
						// 		<link rel="icon" type="image/png" sizes="32x32" href="/favicons/rain/favicon-32x32.png" />
						// 		<link rel="icon" type="image/png" sizes="16x16" href="/favicons/rain/favicon-16x16.png" />
						// 		<link rel="manifest" href="/favicons/rain/site.webmanifest" />
						// 		<link rel="shortcut icon" href="/favicons/rain/favicon.ico" />
						// 		<meta name="msapplication-TileColor" content="#da532c" />
						// 		<meta name="msapplication-config" content="/favicons/rain/browserconfig.xml" />
						// 		<meta name="theme-color" content="#ffffff" />
						// 	</>
						// ),
						// faviconTheme === 'Thunder' && (
						// 	<>
						// 		<link rel="apple-touch-icon" sizes="180x180" href="/favicons/thunder/apple-touch-icon.png" />
						// 		<link rel="icon" type="image/png" sizes="32x32" href="/favicons/thunder/favicon-32x32.png" />
						// 		<link rel="icon" type="image/png" sizes="16x16" href="/favicons/thunder/favicon-16x16.png" />
						// 		<link rel="manifest" href="/favicons/thunder/site.webmanifest" />
						// 		<link rel="shortcut icon" href="/favicons/thunder/favicon.ico" />
						// 		<meta name="msapplication-TileColor" content="#da532c" />
						// 		<meta name="msapplication-config" content="/favicons/thunder/browserconfig.xml" />
						// 		<meta name="theme-color" content="#ffffff" />
						// 	</>
						// )
					}
				</Head>
			)}
			<PageWrapperInner $gridIsActive={gridIsActive}>
				<ProjectList
					data={projects?.allProjects}
					isActive={!gridIsActive}
					setGridIsActive={setGridIsActive}
					handleListIsMouseOver={() => handleListMouseOverOut('over')}
					handleListIsMouseOut={() => handleListMouseOverOut('out')}
				/>
				<ProjectGrid
					data={projects?.allProjects}
					isActive={gridIsActive}
					setGridIsActive={setGridIsActive}
					handleGridIsMouseOver={() => handleGridMouseOverOut('over')}
					handleGridIsMouseOut={() => handleGridMouseOverOut('out')}
				/>
			</PageWrapperInner>
			<PageWrapperMobile>
				<MobileShowreel data={data?.dashboard.mobileShowreel} />
			</PageWrapperMobile>
		</PageWrapper>
	)
};

export async function getStaticProps({ params }) {
	const data = await getDashboard();
	const projects = await getProjects();

	return {
		props: {
			data,
			projects,
		},
	};
}

export default Page;
