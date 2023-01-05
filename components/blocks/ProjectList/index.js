import styled from 'styled-components';
import ProjectListCard from '../../elements/ProjectListCard';

const ProjectListWrapper = styled.div`
	width: ${(props) => props.$isActive ? 'calc(90vw)' : 'calc(10vw)'};
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	overflow: hidden;
	opacity: ${(props) => props.$isActive ? 1 : 0.33};

	transition: all 500ms ease;
`;

const ProjectListInner = styled.div`
	min-width: calc(90vw - 32px);
	max-width: calc(90vw - 32px);
	display: flex;
	flex-direction: column;
	height: calc(100vh - 55px);
	overflow-y: ${(props) => props.$isActive ? 'auto' : 'none'};
	pointer-events: ${(props) => props.$isActive ? 'all' : 'none'};
`;


const ProjectList = ({
		data,
		isActive,
		setGridIsActive,
		handleListIsMouseOver,
		handleListIsMouseOut
	}) => {
	const hasData = data.length > 0;

	return (
		<ProjectListWrapper
			$isActive={isActive}
			onClick={() => setGridIsActive(false)}
			onMouseOver={() => handleListIsMouseOver()}
			onMouseOut={() => handleListIsMouseOut()}
			className={!isActive ? 'cursor-link' : ''}
		>
			<ProjectListInner $isActive={isActive}>
				{hasData && data.map((item, index) => (
					<ProjectListCard data={item} key={index} index={index} />
				))}
				<ProjectListCard
					data={false}
					key={'forthcoming-card'}
					forthcoming={true}
				/>
			</ProjectListInner>
		</ProjectListWrapper>
	);
};

export default ProjectList;
