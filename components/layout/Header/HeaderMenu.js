import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';
import HeaderMenuDetails from './HeaderMenuDetails'
import HeaderMenuContact from './HeaderMenuContact'
import HeaderMenuBottom from './HeaderMenuBottom'
import Grid from '../../common/Grid';

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
`;

const HeaderMenuTopInner = styled.div`
	padding: 80px 16px 16px 16px;
`;

const wrapperVariants = {
	hidden: {
		opacity: 0,
		transition: {
			duration: 0.1,
			ease: 'easeInOut'
		}
	},
	visible: {
		opacity: 1,
		transition: {
			duration: 0.1,
			ease: 'easeInOut'
		}
	}
};

const HeaderMenu = ({ isOpen, data }) => {
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
