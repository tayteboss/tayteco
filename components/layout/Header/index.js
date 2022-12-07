import styled from 'styled-components';
import HeaderIntro from './HeaderIntro';
import HeaderMain from './HeaderMain';
import InnerWrapper from '../../common/InnerWrapper';
import { useEffect, useState } from 'react';
import throttle from 'lodash.throttle';

const HeaderWrapper = styled.header`
	background: ${(props) => props.$isAtProjects ? 'var(--colour-intro-back-engaged);' : 'var(--colour-intro-back)'};
	color: var(--colour-intro-fore);
	height: ${(props) => props.$isReady ? '98vh' : '100vh'};
	padding: 16px 0;
	scroll-snap-align: start;

	transition: all var(--transition-speed-slow) ease;

	.inner-wrapper {
		height: 100%;
	}
`;

const HeaderInner = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 100%;
`;

const Header = ({ data, cursorRefresh }) => {
	const [isReady, setIsReady] = useState(false);
	const [isInitialScroll, setIsInitialScroll] = useState(true);
	const [isAtProjects, setIsAtProjects] = useState(false);

	const handleScrollListener = () => {
		if (scrollY < 10) {
			setIsInitialScroll(true);
		} else {
			setIsInitialScroll(false);
		}

		if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
			setIsAtProjects(true);
		} else {
			setIsAtProjects(false);
		}
	}

	useEffect(() => {
		cursorRefresh();
	}, [isReady, isInitialScroll, isAtProjects])
	

	useEffect(() => {
		const throttleScroll = throttle(handleScrollListener, 100);
		window.addEventListener('scroll', throttleScroll);

		const timer = setTimeout(() => {
			setIsReady(true);
		}, 1000);

		return () => {
			clearTimeout(timer);
			window.removeEventListener('scroll', throttleScroll);
		}
	}, []);

	return (
		<HeaderWrapper $isReady={isReady} $isAtProjects={isAtProjects}>
			<InnerWrapper>
				<HeaderInner>
					<HeaderIntro
						description={data.description}
					/>
					<HeaderMain isInitialScroll={isInitialScroll} isAtProjects={isAtProjects} />
				</HeaderInner>
			</InnerWrapper>
		</HeaderWrapper>
	)
};

export default Header;
