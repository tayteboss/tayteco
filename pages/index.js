import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Grid from '../components/common/Grid';
import { getDashboard, getProjects } from '../lib/datocms';
import ProjectGrid from '../components/blocks/ProjectGrid';
import ProjectList from '../components/blocks/ProjectList';

const PageWrapper = styled.div`
	background: var(--colour-black);
`;

const PageWrapperInner = styled.div`
	padding-top: 32px;
	padding-bottom: 32px;
	padding-left: ${(props) => props.$gridIsActive ? '0' : '16px'};
	padding-right: ${(props) => props.$gridIsActive ? '16px' : '0'};
	display: flex;
	column-gap: 16px;
`;

const Page = ({ data, projects, setDashboardData }) => {
	const [gridIsActive, setGridIsActive] = useState(true);

	useEffect(() => {
	  setDashboardData(data?.dashboard);
	}, [data]);
	
	return (
		<PageWrapper>
			<PageWrapperInner $gridIsActive={gridIsActive}>
				<ProjectList
					data={projects?.allProjects}
					isActive={!gridIsActive}
					setGridIsActive={setGridIsActive}
				/>
				<ProjectGrid
					data={projects?.allProjects}
					isActive={gridIsActive}
					setGridIsActive={setGridIsActive}
				/>
			</PageWrapperInner>
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
