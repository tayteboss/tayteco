import styled from 'styled-components';

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

	&::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 1px;
		background: var(--colour-intro-fore);
		opacity: 0.33;
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

const Link = styled.a``;

const ContentWrapper = styled.div``;

const Text = styled.p`
	color: var(--colour-intro-fore);

	transition: all var(--transition-speed-fast) ease;
`;

const ProjectListCardInner = ({ data, index }) => {
	const { title, categories, link } = data;

	console.log('link', link);

	return (
		<ProjectListCardWrapper>
			<ContentWrapper>
				{title && (
					<Text>{title}</Text>
				)}
				{categories && (
					<Text>{categories}</Text>
				)}
			</ContentWrapper>
			<Text>{index < 9 ? `0${index + 1}` : index + 1}</Text>
		</ProjectListCardWrapper>
	);
};

const ProjectListCard = ({ data, index }) => {
	const { link } = data;

	return (
		<>
			{link ? (
				<Link href={link} target="_blank">
					<ProjectListCardInner data={data} index={index} />
				</Link>
			) : (
				<ProjectListCardInner data={data} index={index} />
			)}
		</>
	);
};

export default ProjectListCard;
