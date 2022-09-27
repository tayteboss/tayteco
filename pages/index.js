import Head from 'next/head';
import { renderMetaTags } from 'react-datocms';
import styled from 'styled-components';
import { getDashboard, getProjects } from '../lib/datocms';

const PageWrapper = styled.div``;

const Page = ({ data, projects }) => {
	console.log('data', data);
	console.log('projects', projects);
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
