import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';
import HeaderMenuDetails from './HeaderMenuDetails'
import HeaderMenuContact from './HeaderMenuContact'
import HeaderMenuBottom from './HeaderMenuBottom'
import Grid from '../../common/Grid';
import MobileMenuHeader from './MobileMenuHeader';

const HeaderMenuWrapper = styled(motion.div)`
	position: fixed;
	top: 0;
	left: 0;
	z-index: 0;
	background: var(--colour-intro-back);
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	pointer-events: all;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		z-index: 100;
		overflow-y: auto;
	}
`;

const HeaderMenuTopInner = styled.div`
	padding: 80px 16px 16px 16px;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		padding: 16px;
	}
`;

const wrapperVariants = {
	hidden: {
		opacity: 0,
		display: 'none',
		transition: {
			duration: 0.2,
			ease: 'easeInOut'
		}
	},
	visible: {
		opacity: 1,
		display: 'flex',
		transition: {
			duration: 0.2,
			ease: 'easeInOut'
		}
	}
};

const HeaderMenu = ({ isOpen, data, setMenuIsOpen }) => {
	return (
		<>
			<AnimatePresence>
				{isOpen && (
					<HeaderMenuWrapper
						variants={wrapperVariants}
						initial='hidden'
						animate='visible'
						exit='hidden'
					>
						<HeaderMenuTopInner>
							<Grid>
								<MobileMenuHeader setMenuIsOpen={setMenuIsOpen} />
								<HeaderMenuDetails description={data?.menuDescription} />
								<HeaderMenuContact
									igLink={data?.instagramUrl}
									arLink={data?.arenaUrl}
									liLink={data?.linkedinUrl}
								/>
							</Grid>
						</HeaderMenuTopInner>
						<HeaderMenuBottom aoc={data?.aoc} />
					</HeaderMenuWrapper>
				)}
			</AnimatePresence>
		</>
	);
};

export default HeaderMenu;
