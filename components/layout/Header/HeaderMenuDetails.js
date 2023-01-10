import styled from 'styled-components';
import RichText from '../../common/RichText';

const HeaderMenuDetailsWrapper = styled.div`
	grid-column: span 6;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		margin-bottom: 16px;
	}
`;

const IntroStatementWrapper = styled.div`
	max-width: 460px;
`;

const HeaderMenuDetails = ({ description }) => {
	return (
		<HeaderMenuDetailsWrapper>
			<IntroStatementWrapper>
				<RichText data={description} />
				<p>© {new Date().getFullYear()} tayte.co</p>
			</IntroStatementWrapper>
		</HeaderMenuDetailsWrapper>
	);
};

export default HeaderMenuDetails;
