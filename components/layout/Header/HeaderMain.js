import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';
import Grid from '../../common/Grid';
import AvailableWidget from '../../elements/AvailableWidget';

const HeaderMainWrapper = styled.div``;

const Logo = styled.div`
	grid-column: 1 / 7;
	position: relative;

	transition: all var(--transition-speed-fast) ease;
`;

const InitialRHS = styled.div`
	grid-column: 7 / -1;
	display: flex;
	justify-content: space-between;

	transition: all var(--transition-speed-fast) ease;
`;

const ScrollTrigger = styled(motion.button)`
	color: var(--colour-intro-fore);
	text-decoration: underline;

	transition: all var(--transition-speed-fast) ease;
`;

const MotionWrapper = styled(motion.div)``;

const MenuTrigger = styled(motion.button)`
	color: var(--colour-intro-fore);
	text-decoration: underline;

	transition: all var(--transition-speed-fast) ease;
`;

const wrapperVariants = {
	hidden: {
		opacity: 0,
		display: 'none',
		transition: {
			duration: 0.3,
			ease: 'easeInOut'
		}
	},
	visible: {
		opacity: 1,
		display: 'block',
		transition: {
			duration: 0.3,
			ease: 'easeInOut'
		}
	}
};

const HeaderMain = ({ isAtProjects }) => {

	const handleScrollToProjects = () => {
		window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
	}

	return (
		<HeaderMainWrapper>
			<Grid>
				<Logo>tayte.co</Logo>
				<InitialRHS>
					<AnimatePresence>
						{!isAtProjects && (
							<ScrollTrigger
								className="type-p"
								variants={wrapperVariants}
								initial="hidden"
								animate="visible"
								exit="hidden"
								key={1}
								onClick={() => handleScrollToProjects()}
							>
								Scroll to projects
							</ScrollTrigger>
						)}
					</AnimatePresence>
					<AnimatePresence >
						{isAtProjects && (
							<MenuTrigger
								className="type-p"
								variants={wrapperVariants}
								initial="hidden"
								animate="visible"
								exit="hidden"
								key={3}
							>
								More information
							</MenuTrigger>
						)}
					</AnimatePresence>
					<AvailableWidget />

				</InitialRHS>
			</Grid>
		</HeaderMainWrapper>
	);
};

export default HeaderMain;
