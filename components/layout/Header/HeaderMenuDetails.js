import styled from 'styled-components';
import RichText from '../../common/RichText';

const HeaderMenuDetailsWrapper = styled.div`
	grid-column: span 6;
`;

const IntroStatementWrapper = styled.div`
	max-width: 350px;
`;

const HeaderMenuDetails = ({ description }) => {
	return (
		<HeaderMenuDetailsWrapper>
			<IntroStatementWrapper>
				<RichText data={description} />
			</IntroStatementWrapper>
		</HeaderMenuDetailsWrapper>
	);
};

export default HeaderMenuDetails;
