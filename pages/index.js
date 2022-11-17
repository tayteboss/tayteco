import Head from 'next/head';
import { useEffect } from 'react';
import { renderMetaTags } from 'react-datocms';
import styled from 'styled-components';
import { getDashboard, getProjects } from '../lib/datocms';

const PageWrapper = styled.div``;

const Page = ({ data, projects, setDashboardData }) => {

	useEffect(() => {
	  setDashboardData(data?.dashboard);
	}, [data]);
	
	return (
		<PageWrapper>
			{/* <Head>{renderMetaTags(data.seo)}</Head> */}
			Home
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
