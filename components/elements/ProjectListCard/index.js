import { motion } from 'framer-motion';
import styled from 'styled-components';

const ProjectListCardOuterWrapper = styled.div`
	position: relative;

	&::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 1px;
		background: var(--colour-intro-fore);
		opacity: ${(props) => props.$forthcoming ? 0 : 0.33};
	}
	
	&:last-child {
		&::after {
			content: '';
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 1px;
			background: var(--colour-intro-fore);
			opacity: 0.33;
		}
	}
`;

const ProjectListCardWrapper = styled.div`
	position: relative;
	min-width: 100%;
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	padding: 8px 0 11px;
	text-align: left;

	&:hover {
		p {
			color: var(--colour-white);
		}
	}
`;

const Link = styled.a``;

const ContentWrapper = styled.div``;

const Text = styled.p`
	color: ${(props) => props.theme.colours.foreThunder};

	transition: all var(--transition-speed-fast) ease;
`;

const Icon = styled(motion.div)`
	background: var(--colour-intro-fore);
	height: 10px;
	width: 10px;
	border-radius: 100%;
`;

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

const ProjectListCardInner = ({ data, index, forthcoming }) => {
	const { title, categories, link, year } = data;

	return (
		<ProjectListCardWrapper $forthcoming={forthcoming}>
			{forthcoming ? (
				<>
					<ContentWrapper>
						<Text>Have a project?</Text>
						<Text>Get in touch</Text>
					</ContentWrapper>
					<Icon
						variants={IconVariants}
						initial="hidden"
						animate="visible"
						exit="hidden"
					/>
				</>
			) : (
				<>
					<ContentWrapper>
						{title && (
							<Text>{title}</Text>
						)}
						{categories && (
							<Text>{categories}</Text>
						)}
						{year && (
							<Text>{year}</Text>
						)}
					</ContentWrapper>
					<Text>{index < 9 ? `0${index + 1}` : index + 1}</Text>
				</>
			)}
		</ProjectListCardWrapper>
	);
};

const ProjectListCard = ({ data, index, forthcoming }) => {
	const { link } = data;

	return (
		<ProjectListCardOuterWrapper>
			{forthcoming ? (
				<Link href="mailto:speakto@tayte.co">
					<ProjectListCardInner
						data={data}
						index={index}
						forthcoming={true}
					/>
				</Link>
			) : (
				link ? (
					<Link href={link} target="_blank">
						<ProjectListCardInner data={data} index={index} />
					</Link>
				) : (
					<ProjectListCardInner data={data} index={index} />
				)
			)}
		</ProjectListCardOuterWrapper>
	);
};

export default ProjectListCard;
