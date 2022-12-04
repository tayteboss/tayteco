import Head from 'next/head';
import { useEffect } from 'react';
import { renderMetaTags } from 'react-datocms';
import styled from 'styled-components';
import Grid from '../components/common/Grid';
import InnerWrapper from '../components/common/InnerWrapper';
import { getDashboard, getProjects } from '../lib/datocms';
import ProjectGrid from '../components/blocks/ProjectGrid';
import ProjectList from '../components/blocks/ProjectList';

const PageWrapper = styled.div`
	background: var(--colour-black);
`;

const PageWrapperInner = styled.div`
	padding: 32px 0;
`;

const Page = ({ data, projects, setDashboardData }) => {

	useEffect(() => {
	  setDashboardData(data?.dashboard);
	}, [data]);
	
	return (
		<PageWrapper>
			<PageWrapperInner>
				<Grid>
					<ProjectList data={projects?.allProjects} />
					<ProjectGrid data={projects?.allProjects} />
				</Grid>
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
