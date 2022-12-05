import styled from 'styled-components';
import ProjectListCard from '../../elements/ProjectListCard';

const ProjectListWrapper = styled.div`
	width: ${(props) => props.$isActive ? 'calc(90vw)' : 'calc(10vw)'};
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	overflow: hidden;
	height: 100vh;

	transition: all 500ms ease;
`;

const ProjectListInner = styled.div`
	min-width: calc(90vw - 32px);
	max-width: calc(90vw - 32px);
	display: flex;
	flex-direction: column;
	height: 100vh;
	overflow-y: auto;
`;


const ProjectList = ({ data, isActive, setGridIsActive }) => {
	const hasData = data.length > 0;

	console.log('isActive', isActive);

	return (
		<ProjectListWrapper
			$isActive={isActive}
			onClick={() => setGridIsActive(false)}
		>
			<ProjectListInner>
				{hasData && data.map((item, index) => (
					<ProjectListCard data={item} key={index} index={index} />
				))}
			</ProjectListInner>
		</ProjectListWrapper>
	);
};

export default ProjectList;
