import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { getDashboard, getProjects } from '../lib/datocms';
import ProjectGrid from '../components/blocks/ProjectGrid';
import ProjectList from '../components/blocks/ProjectList';
import MobileShowreel from '../components/blocks/MobileShowreel';

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

const Page = ({ data, projects, setDashboardData, setCursorLoading }) => {
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
