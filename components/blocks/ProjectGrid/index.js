import styled from 'styled-components';
import Grid from '../../common/Grid';
import ProjectGridCard from '../../elements/ProjectGridCard';

const ProjectGridWrapper = styled.div`
	width: ${(props) => props.$isActive ? 'calc(90vw)' : 'calc(10vw)'};
	overflow: hidden;

	transition: all 500ms ease;

	.grid {
		row-gap: 16px;
	}
`;

const ProjectGridInner = styled.div`
	min-width: calc(90vw - 32px);
	max-width: calc(90vw - 32px);
	height: 100vh;
	overflow-y: auto;
`;

const ProjectGrid = ({ data, isActive, setGridIsActive }) => {
	const hasData = data.length > 0;

	return (
		<ProjectGridWrapper $isActive={isActive} onClick={() => setGridIsActive(true)}>
			<ProjectGridInner>
				<Grid>
					{hasData && data.map((item, index) => (
						<ProjectGridCard data={item} key={index} />
					))}
					<ProjectGridCard
						data={false}
						key={'forthcoming-card'}
						forthcoming={true}
					/>
				</Grid>
			</ProjectGridInner>
		</ProjectGridWrapper>
	);
};

export default ProjectGrid;
