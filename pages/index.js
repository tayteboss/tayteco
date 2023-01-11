import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { getDashboard, getProjects } from '../lib/datocms';
import ProjectGrid from '../components/blocks/ProjectGrid';
import ProjectList from '../components/blocks/ProjectList';
import MobileShowreel from '../components/blocks/MobileShowreel';
import { NextSeo } from 'next-seo';
import Head from 'next/head';

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
	faviconTheme,
	isInitialScroll
}) => {
	const [gridIsActive, setGridIsActive] = useState(true);
	const [isReady, setIsReady] = useState(false);
	const [isInitial, setIsInitial] = useState(true);

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

	useEffect(() => {
		if (isInitialScroll) return;
		setTimeout(() => {
			setIsInitial(false);
		}, 1000);
	}, [isInitialScroll]);

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
			<Head>
				<link rel="apple-touch-icon" sizes="180x180" href={`/favicons/${faviconTheme}/apple-touch-icon.png`} />
				<link rel="icon" type="image/png" sizes="32x32" href={`/favicons/${faviconTheme}/favicon-32x32.png`} />
				<link rel="icon" type="image/png" sizes="16x16" href={`/favicons/${faviconTheme}/favicon-16x16.png`} />
				<link rel="manifest" href={`/favicons/${faviconTheme}/site.webmanifest`} />
				<link rel="shortcut icon" href={`/favicons/${faviconTheme}/favicon.ico`} />
				<meta name="msapplication-TileColor" content="#da532c" />
				<meta name="msapplication-config" content={`/favicons/${faviconTheme}/browserconfig.xml`} />
				<meta name="theme-color" content="#ffffff" />
			</Head>
			<PageWrapperInner $gridIsActive={gridIsActive}>
				<ProjectList
					data={projects?.allProjects}
					isActive={!gridIsActive}
					isInitial={isInitial}
					setGridIsActive={setGridIsActive}
					handleListIsMouseOver={() => handleListMouseOverOut('over')}
					handleListIsMouseOut={() => handleListMouseOverOut('out')}
				/>
				<ProjectGrid
					data={projects?.allProjects}
					isActive={gridIsActive}
					isInitial={isInitial}
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
