import styled from 'styled-components';
import Grid from '../../common/Grid';
import AvailableWidget from '../../elements/AvailableWidget';

const HeaderMainWrapper = styled.div``;

const Logo = styled.div`
	grid-column: 1 / 7;
`;

const InitialRHS = styled.div`
	grid-column: 7 / -1;
	display: flex;
	justify-content: space-between;
`;

const ScrollTrigger = styled.button`
	color: var(--colour-intro-fore);
`;

const HeaderMain = () => {
	return (
		<HeaderMainWrapper>
			<Grid>
				<Logo>tayte.co</Logo>
				<InitialRHS>
					<ScrollTrigger className="type-p">
						Scroll to projects
					</ScrollTrigger>
					<AvailableWidget />
				</InitialRHS>
			</Grid>
		</HeaderMainWrapper>
	);
};

export default HeaderMain;
