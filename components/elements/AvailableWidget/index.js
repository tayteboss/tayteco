import styled from 'styled-components';
import { motion } from 'framer-motion';

const AvailableWidgetWrapper = styled.div`
	display: flex;
	align-items: center;

	transition: all var(--transition-speed-fast) ease;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		display: none;
	}
`;

const Icon = styled(motion.div)`
	background: rgb(0, 255, 0);
	height: 7px;
	width: 7px;
	border-radius: 100%;
	margin-right: 9px;
`;

const Title = styled.p``;

const IconVariants = {
	hidden: {
		opacity: 0,
		transition: {
			duration: 0.3,
			ease: 'easeInOut'
		}
	},
	visible: {
		opacity: [1, 0],
		transition: {
			duration: 0.6,
			ease: 'linear',
			repeat: 'Infinity',
			repeatType: "reverse",
		}
	}
};

const AvailableWidget = ({ isAvailable }) => {
	return (
		<AvailableWidgetWrapper>
			<Icon
				variants={IconVariants}
				initial="hidden"
				animate="visible"
				exit="hidden"
			/>
			<Title>{isAvailable ? 'Available for work' : 'Not available for work'}</Title>
		</AvailableWidgetWrapper>
	);
};

export default AvailableWidget;
