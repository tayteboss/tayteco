import styled from 'styled-components';
import { motion } from 'framer-motion';

const AvailableWidgetWrapper = styled.div`
	display: flex;
	align-items: center;
`;

const Icon = styled(motion.div)`
	background: var(--colour-intro-fore);
	height: 7px;
	width: 7px;
	border-radius: 100%;
	margin-right: 9px;
`;

const Title = styled.p``;

const wrapperVariants = {
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

const AvailableWidget = () => {
	return (
		<AvailableWidgetWrapper>
			<Icon
				variants={wrapperVariants}
				initial="hidden"
				animate="visible"
				exit="hidden"
			/>
			<Title>Available for work</Title>
		</AvailableWidgetWrapper>
	);
};

export default AvailableWidget;