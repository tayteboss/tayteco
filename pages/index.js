import Head from 'next/head';
import { renderMetaTags } from 'react-datocms';
import styled from 'styled-components';
import { getPage } from '../lib/datocms';

const PageWrapper = styled.div``;

const Page = ({ data }) => (
	<PageWrapper>
		{/* <Head>{renderMetaTags(data.seo)}</Head> */}
		Home
	</PageWrapper>
);

export async function getStaticProps({ params }) {
	// const data = await getPage('home');
	const data = false;

	return {
		props: {
			data,
		},
	};
}

export default Page;
