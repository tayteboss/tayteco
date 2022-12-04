import styled from 'styled-components';
import Grid from '../../common/Grid';
import ProjectGridCard from '../../elements/ProjectGridCard';

const ProjectGridWrapper = styled.div`
	grid-column: 2 / -1;

	.grid {
		row-gap: 16px;
	}
`;

const ProjectGrid = ({ data }) => {

	console.log('data', data);

	const hasData = data.length > 0;

	return (
		<ProjectGridWrapper>
			<Grid>
				{hasData && data.map((item, index) => (
					<ProjectGridCard data={item} key={index} />
				))}
				<ProjectGridCard data={false} key={'forthcoming-card'} forthcoming={true} />
			</Grid>
		</ProjectGridWrapper>
	);
};

export default ProjectGrid;
