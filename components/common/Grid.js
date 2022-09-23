import styled from 'styled-components';

const GridWrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(12, minmax(0, 1fr));
	grid-column-gap: 16px;
	align-items: start;
	
	@media ${props => props.theme.mediaBreakpoints.tabletPortrait}
	{
		grid-template-columns: repeat(6, minmax(0, 1fr));
	}
`;

const Grid = (props) => {
	return (
		<GridWrapper className="grid">
			{props.children}
		</GridWrapper>
	)
};

export default Grid;