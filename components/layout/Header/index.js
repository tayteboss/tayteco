import styled from 'styled-components';
import HeaderIntro from './HeaderIntro';
import HeaderMain from './HeaderMain';
import InnerWrapper from '../../common/InnerWrapper';
import { useEffect, useState } from 'react';
import throttle from 'lodash.throttle';
import HeaderMenu from './HeaderMenu';
import GameOfLife from '../../blocks/GameOfLife';

const HeaderWrapper = styled.header`
	scroll-snap-align: end;
	position: relative;
	z-index: 2;
	background: ${(props) => props.$isAtProjects ? 'var(--colour-intro-back-engaged)' : 'var(--colour-intro-back)'};

	transition: all var(--transition-speed-slow) ease;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		scroll-snap-align: unset;
	}

	.inner-wrapper {
		height: 100%;
	}
`;

const HeaderOuter = styled.div`
	position: relative;
	z-index: 15;
	pointer-events: none;
	color: var(--colour-intro-fore);
	height: ${(props) => props.$isReady ? 'calc(var(--vh) * 100 - 32px)' : 'calc(var(--vh) * 100)'};
	padding: 16px 0;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		height: ${(props) => props.$isReady ? 'calc(var(--vh) * 50)' : 'calc(var(--vh) * 100)'};
		scroll-snap-align: unset;

		transition: all 500ms ease;
	}
`;

const HeaderInner = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 100%;
	position: relative;
`;

const Header = ({
	data,
	cursorRefresh,
	setFaviconTheme,
	setIsInitialScroll,
	isInitialScroll
}) => {
	const [isReady, setIsReady] = useState(false);
	const [isAtProjects, setIsAtProjects] = useState(false);
	const [menuIsOpen, setMenuIsOpen] = useState(false);

	const handleScrollListener = () => {
		if (scrollY < 10) {
			setIsInitialScroll(true);
		} else {
			setIsInitialScroll(false);
		}

		if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 300)) {
			setIsAtProjects(true);
		} else {
			setIsAtProjects(false);
		}
	}

	useEffect(() => {
		cursorRefresh();

		const timer = setTimeout(() => {
			cursorRefresh();
		}, 500);

		if (!menuIsOpen) return () => {
			clearTimeout(timer);
		};

		window.addEventListener('scroll', () => setMenuIsOpen(false));

		return () => {
			clearTimeout(timer);
		}
	}, [menuIsOpen])

	useEffect(() => {
		cursorRefresh();

		if (isReady) {
			const timer = setTimeout(() => {
				const html = document.querySelector('html');
				html.style.overflowY = 'scroll';
			}, 1000);
	
			return () => {
				clearTimeout(timer);
			}
		}
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
			<GameOfLife />
			<HeaderOuter $isReady={isReady} $isAtProjects={isAtProjects}>
				<InnerWrapper>
					<HeaderInner>
						<HeaderIntro
							description={data.description}
							cursorRefresh={cursorRefresh}
							setFaviconTheme={setFaviconTheme}
						/>
						<HeaderMain
							isInitialScroll={isInitialScroll}
							isAtProjects={isAtProjects}
							setMenuIsOpen={setMenuIsOpen}
							menuIsOpen={menuIsOpen}
							data={data}
						/>
						<HeaderMenu
							isOpen={menuIsOpen}
							data={data}
							setMenuIsOpen={setMenuIsOpen}
						/>
					</HeaderInner>
				</InnerWrapper>
			</HeaderOuter>
		</HeaderWrapper>
	)
};

export default Header;
