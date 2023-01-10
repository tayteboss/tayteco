import { useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const PageWrapper = styled.div``;

const Page = () => {
	const router = useRouter();

	useEffect(() => {
		router.push('/');
	}, []);

	return (
		<PageWrapper />
	)
}

export default Page;
